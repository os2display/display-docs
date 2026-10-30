---
layout: default
title: Layouts
parent: Content Structure
nav_order: 1
---

# Layouts

Layouts are the screen settings, that defines how a screen is divided into different regions.
These layouts consist of a grid.

The grid regions are created from the number of rows and columns selected for the given layout. The regions are named

`[a-z][aa-zz][aaa-zzz]`

## 3.x

From 3.0 the core layouts are part of the application in
[`assets/shared/screen-layouts/`](https://github.com/os2display/os2display/tree/main/assets/shared/screen-layouts).
Custom layouts for an installation go in `assets/shared/custom-screen-layouts/`.

List, install and remove layouts with:

```sh
bin/console app:screen-layouts:list
bin/console app:screen-layouts:install --all
bin/console app:screen-layouts:remove <SCREEN_LAYOUT_ULID>
```

`app:update` installs and updates all layouts.

## 2.x (legacy)

Layouts are stored in [screen-layouts](https://github.com/os2display/display-templates/tree/develop/build/screen-layouts)

### Installation of layouts

To install a layout the following command should be run in the API Service:

```sh
bin/console app:screen-layouts:load [path_to_layout].json
```

To remove the same layout:

```sh
bin/console app:screen-layouts:remove [path_to_layout].json
```

## Touch regions in layouts

This works the same in 3.x and 2.x. A region can be rendered as buttons. In this scenario each slide that is present in a region is added as a button that
can be opened in full screen. It will close when the slide has run or if the user presses the close button.

To make a layout region into a touch button region, add the following to the region in the layout `.json` file:

```
"type": "touch-buttons"
```
