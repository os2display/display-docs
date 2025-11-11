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

Layouts are stored in [screen-layouts](https://github.com/os2display/display-templates/tree/develop/build/screen-layouts)

## Installation of layouts

To install a layout the following command should be run in the API Service:

```sh
bin/console app:screen-layouts:load [path_to_layout].json
```

To remove the same layout:

```sh
bin/console app:screen-layouts:remove [path_to_layout].json
```

## Touch regions in layouts

A region can be rendered as buttons. In this scenario each slide that is present in a region is added as a button that
can be opened in full screen. It will close when the slide has run or if the user presses the close button.

To make a layout region into a touch button region, add the following to the region in the layout `.json` file:

```
"type": "touch-buttons"
```
