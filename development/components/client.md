---
layout: default
title: Client (Screen) 
parent: Components
nav_order: 3
---

# Client

The client is the content player. This will display the content that is bound to the given screen.

## Authentication

To bind a Client with a screen entity created in the Admin the Client will display a unique code, 
that should be entered on the given screen in the admin.

## Campaigns

To support campaigns overriding a screen, the pull-strategy.js has code that switches between campaign content and
regular content. If another strategy is implemented it should handle campaigns in a similar fashion. Campaigns are
always run in full screen disregarding screen layout.

See [https://github.com/os2display/display-client/blob/develop/src/data-sync/pull-strategy.js](https://github.com/os2display/display-client/blob/develop/src/data-sync/pull-strategy.js).

## Touch

To support touch buttons that can show slide content in full screen region.js has a section of code that supports turning 
slides in a playlist into buttons that can be displayed in full screen. This only applies if the ScreenLayout region
is marked with `type: "touch"`.

See [https://github.com/os2display/display-client/blob/develop/src/region.js](https://github.com/os2display/display-client/blob/develop/src/region.js).

## Event Model

![Event model](../assets/client-event-model.png)

TODO: Make sure this drawing is up-to-date.
