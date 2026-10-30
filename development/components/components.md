---
title: Components
layout: default
parent: Udvikling
nav_order: 2
has_children: true
---

# Components

## Architecture

```mermaid
flowchart LR
    A[Admin] <-->B(API)
    B <--> C(Client)
```

From 3.0 all three components are part of one application,
[os2display/os2display](https://github.com/os2display/os2display): the Symfony API, plus the admin and client
React applications in `assets/admin` and `assets/client`, served at `/admin` and `/client`. In 2.x they were
separate repositories (`display-api-service`, `display-admin-client` and `display-client`).

## API service

This is the main component of the system. All content is created/retrieved through api calls to the API service.
The API service is a [Symfony](https://symfony.com/) project built with [API Platform](https://api-platform.com/).
See [api-service.md](api-service) for further descriptions.
See [security.md](api-service/security) for further description of the security setup.

## Admin

This is where content, connections and screens are created and connected.
See [Content Structure](https://github.com/os2display/os2display#content-structure) in the README for how the
admin elements relate.
The admin is built with [React](https://reactjs.org/).
See [admin.md](admin) for further descriptions.

## Client

This is the output screen where the content will be displayed.
The screen client is built with [React](https://reactjs.org/).
See [client.md](client) for further descriptions.