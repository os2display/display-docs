---
title: Hosting
parent: Installation og drift
layout: default
nav_order: 3
has_children: false
---

# Hosting

## Basics
To host the API you will need to be able to host a Symfony application with a MariaDB database and a caching layer. You should be famliar with the basics of deploying Symfony: [How to Deploy a Symfony Application](https://symfony.com/doc/current/deployment.html)

To host the Display Client and the Admin Client you need to be able to host standard react applications. You should be familiar with [Create React App - Deployment](https://create-react-app.dev/docs/deployment/)

## Docker based hosting
Docker images are built automatically for all three apps by Github Actions. They are tagged as follows:
- `latest` most recent tag on main branch
- `x.y.z` version tag on main branch
- `develop` most recent tag on develop

The images are published to as:
- [itkdev/os2display-client](https://hub.docker.com/repository/docker/itkdev/os2display-client) the display (screen) client
- [itkdev/os2display-admin-client](https://hub.docker.com/repository/docker/itkdev/os2display-admin-client) the admin (editor) client
- [itkdev/os2display-api-service](https://hub.docker.com/repository/docker/itkdev/os2display-api-service) the PHP container with the Symfony application
- [itkdev/os2display-api-service-nginx](https://hub.docker.com/repository/docker/itkdev/os2display-api-service-nginx) a nginx container to host as the web sever

An example of how to host the images can be seen at https://github.com/os2display/display-docker-server


## General Hosting
If you don't want to use the pre-built images, or have other hosting requirements these are the general instructions.

### Api
The Symfony application expects to be hosted at the root of your application domain. E.g. http://demo.os2display.dk/

The api will be availiable at `/api/v1`. OpenApi documnetation at `/docs` and uploaded `/media` at `/media`

To host the api you need a webserver that can host PHP applications such as nginx. A MariaDB database and a Redis server for caching. 

#### Installation
Check out the repository in your folder of choice. 

Make a `.env.local` file by copying the include `.env` file. Edit the `env.local` and set the relevant values for your environment. Specifically you need to set the `DATABASE_URL` to point to your MariaDB and `REDIS_CACHE_DSN` to point to a Redis instance for application caching.

In that folder run the following commands:
```sh
# Install PHP dependencies
composer install --no-dev --optimize-autoloader

# Clear the cache
APP_ENV=prod APP_DEBUG=0 php bin/console cache:clear

# Run database migrations
APP_ENV=prod APP_DEBUG=0 php bin/console doctrine:migrations:migrate --no-interaction

# Generate JWT public/private keypair
APP_ENV=prod APP_DEBUG=0 php bin/console lexik:jwt:generate-keypair
```

Refer Symfonys documentation for general best practises for deployment.

#### Things to note

##### Tenants
The application is build to support hosting multiple "tenants" in one installation. All content will scoped by tenant and cannot be seen by users from other tenants unless it is actively shared. To start using your installation you should first make a tenant using the `php bin/console app:tenant:add` command. Then create users with `php bin/console app:user:add`. Currently users created with this command are given access to all existing tenants.

For users who log in via OpenId Connect tenants are created automatically by the roles given as claims.

No further "manual" user management is currently supported.

##### Authentication
Api Authentication is done using JWT. For the api to be able to issue JWT tokens you need to configure [LexikJWTAuthenticationBundle](https://github.com/lexik/LexikJWTAuthenticationBundle) correctly in the `.env.local` file. At minimum you set a custom value for `JWT_PASSPHRASE`. You can also customise the token lifetime if needed through `JWT_TOKEN_TTL`

```env
###> lexik/jwt-authentication-bundle ###
JWT_PASSPHRASE=APP_JWT_PASSPHRASE
JWT_TOKEN_TTL=3600
###< lexik/jwt-authentication-bundle ###
```

Refer to the bundles documentation for further options.

[JWTRefreshTokenBundle](https://github.com/markitosgv/JWTRefreshTokenBundle) is used for refresh tokens for the display clients. 

OpenId Connect is supported through [AzureB2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/openid-connect). Other OPenID providers should work but are not tested. When using OpenId Connect the api expects roles to come in the format `<tenantKey>Redaktør` and `<tenantKeyAdmin>` e.g dokk1Admin for an user with role admin for the dokk1 tenant. This is currently not configurable.

### Display Client
This is the client to run on your displays (screens). Simply check out the repository and run `RUN yarn install && yarn build`. This will create a production build. The Display Client expects to be hosted at `/client`.

After building you should create a `config.json` file and a `release.json` file. When booting the client will lock for these at `/client/config.json` and `/client/release.json` respectivly. You can create them by copying the examples files in `/public`.

Please adapt the values in `config.json` for your specific hosting setup:
```json
{
  "authenticationEndpoint": "https://displayapiservice.local.itkdev.dk/v1/authentication/screen",
  "authenticationRefreshTokenEndpoint": "https://displayapiservice.local.itkdev.dk/v1/authentication/token/refresh",
  "dataStrategy": {
    "type": "pull",
    "config": {
      "interval": 30000,
      "endpoint": "https://displayapiservice.local.itkdev.dk"
    }
  },
  "colorScheme": {
    "type": "library",
    "lat": 56.0,
    "lng": 10.0
  },
  "schedulingInterval": 60000,
  "debug": true
}
```

And adapt the values in `release.json` to match your build (this is build automatically in the docker images:
```json
{
    "releaseTimestamp": 1652273741,
    "releaseTime": "Wed May 11 12:55:41 UTC 2022",
    "releaseVersion": "develop"
}
```

All screen clients will check `releaseTimestamp` value at an interval and reload themselves if they see a new version. 

### Admin Client
This is the client the users accesses to create and schedule content. Simply check out the repository and run `RUN yarn install && yarn build`. This will create a production build. The Admin Client expects to be hosted at `/admin`.

After building you should create a `config.json` file and a `access-config.json` file. When booting the client will lock for these at `/client/config.json` and `/client/access-config.json` respectivly. You can create them by copying the examples files in `/public`.

Please adapt the values in `config.json` for your specific hosting setup:
```json
{
  "api": "/",
  "touchButtonRegions": false
}
```

You should not change the `access-config.json` file unless you plan to make similar changes in Symfonys access model.


