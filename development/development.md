---
title: Development
layout: default
parent: Udvikling
has_children: false
---

# Development

To work on the complete system with API, admin, client and templates each project's docker-compose file should be started.

The templates should be installed with the `-dev.json` file. This is done with the command in the API docker container:

````bash
bin/console app:template:load https://raw.githubusercontent.com/os2display/display-templates/develop/build/book-review/book-review-dev.json
````

--------------------------------------------------------------------------------

OS2Display consists of 4 parts:

1. API: <https://github.com/os2display/display-api-service>
2. Admin: <https://github.com/os2display/display-admin-client>
3. Client: <https://github.com/os2display/display-client>
4. Templates: <https://github.com/os2display/display-templates>

The guide below will start all parts and connect them via apropriate configuration.

```shell
mkdir os2display
cd os2display
git clone --branch develop https://github.com/os2display/display-admin-client
git clone --branch develop https://github.com/os2display/display-api-service
git clone --branch develop https://github.com/os2display/display-client
git clone --branch develop https://github.com/os2display/display-templates
```

## API

Cf. <display-api-service/README.md>.

```shell
cd display-api-service

# Start the API
docker compose up --detach
docker compose exec phpfpm composer install
docker compose exec phpfpm bin/console doctrine:migrations:migrate --no-interaction
open "http://$(docker compose port nginx 8080)"

# Load fixtures (optional, but useful)
docker compose exec phpfpm bin/console hautelook:fixtures:load --no-interaction

# Create admin user
docker compose --project-name displayapiservice exec phpfpm bin/console app:user:add admin@example.com password Admin admin ABC

# Create editor user
docker compose --project-name displayapiservice exec phpfpm bin/console app:user:add editor@example.com password Editor editor ABC
# Generate JWT kay pair
docker compose --project-name displayapiservice exec phpfpm bin/console lexik:jwt:generate-keypair

cd
```

### Test the API

```shell
export OS2DISPLAY_API_URL="http://$(docker compose --project-name displayapiservice port nginx 8080)"
# Fetch token
export OS2DISPLAY_API_TOKEN=$(curl --silent --request POST \
  "$OS2DISPLAY_API_URL/v1/authentication/token" \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --data '{
    "email": "editor@example.com",
    "password": "password"
  }' | docker run --rm --interactive efrecon/jq:1.7 '.token' --raw-output
)

# Get layouts
curl --silent --request GET \
  "$OS2DISPLAY_API_URL/v1/layouts?page=1&itemsPerPage=10" \
  --header 'accept: application/ld+json' \
  --header "authorization: Bearer $OS2DISPLAY_API_TOKEN"

# Prettyprint JSON
curl --silent --request GET \
  "$OS2DISPLAY_API_URL/v1/layouts?page=1&itemsPerPage=10" \
  --header 'accept: application/ld+json' \
  --header "authorization: Bearer $OS2DISPLAY_API_TOKEN" | docker run --rm --interactive efrecon/jq:1.7 '.'

@ Effectively disable CORS for development:
cat <<'EOF' >> .env.local
CORS_ALLOW_ORIGIN="^.*"
EOF

cd
```

## Admin

Cf. <display-admin-client/README.md>.

```shell
cd display-admin-client

# Create config
cat public/example_config.json | docker run --rm --interactive efrecon/jq:1.7 --arg API "http://$(docker compose --project-name displayapiservice port nginx 8080)" '.api = $API' > public/config.json
docker compose up --detach

docker compose run --rm node yarn install

open "http://$(docker compose port nginx 8080)/admin"

cd
```

## Client

Cf. <display-client/README.md>.

```shell
cd display-client

docker compose up --detach
docker compose run --rm node yarn install
docker compose run --rm node yarn build

# Set config
cat public/example_config.json | docker run --rm --interactive efrecon/jq:1.7 --arg API "http://$(docker compose --project-name displayapiservice port nginx 8080)" '.apiEndpoint = $API|.authenticationEndpoint = $API+"/v1/authentication/screen"|.authenticationRefreshTokenEndpoint = $API+"/v1/authentication/token/refresh"|.dataStrategy.config.endpoint = $API' > public/config.json
cat public/example_release.json | docker run --rm --interactive efrecon/jq:1.7 '.' > public/release.json

open "http://$(docker compose port nginx 8080)"

cd
```

The client shows an activation coda that must be entered on a screen in the admin interface:

```shell
open "http://$(docker compose --project-name display-admin-client port nginx 8080)/admin/screen/list"
```

After connecting the client to a screen, the client should start displaying content.

## Templates

Cf. <display-templates/README.md>.

```shell
cd display-templates

docker compose up --detach
docker compose run --rm node yarn install
docker compose run --rm node yarn build

open "http://$(docker compose port nginx 80)/build"

cd
```
