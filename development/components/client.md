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

See [assets/client/data-sync/pull-strategy.js](https://github.com/os2display/os2display/blob/main/assets/client/data-sync/pull-strategy.js)
(in 2.x: `src/data-sync/pull-strategy.js` in `display-client`).

## Touch

To support touch buttons that can show slide content in full screen, the client turns the slides in a playlist into
buttons that can be displayed in full screen. This only applies if the ScreenLayout region is marked with
`type: "touch-buttons"`.

See [assets/client/components/touch-region.jsx](https://github.com/os2display/os2display/blob/main/assets/client/components/touch-region.jsx)
(in 2.x: `src/region.js` in `display-client`).

## Event Model

![Event model](../assets/client-event-model.png)

TODO: Make sure this drawing is up-to-date.
