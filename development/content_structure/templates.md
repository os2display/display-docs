---
layout: default
title: Templates
parent: Content Structure
nav_order: 2
---

# Templates

See [https://github.com/os2display/display-templates](https://github.com/os2display/display-templates) for core templates.

## How to create a template

The templates are injected with react [remote component](https://github.com/Paciolan/remote-component).
The components that are loaded in the client should be compiled before.
See https://github.com/os2display/display-templates for how to compile templates.

The client loads a compiled react component. The template is describes as json files.

### Json files

An example of the required .json files is [Image text](https://github.com/os2display/display-templates/tree/develop/build/image-text).

* A `*.json` file that describes where to find the required files for a template.
* A `*-dev.json` file that describes where to find the required files in a development context.
* A `*-admin.json` file that describes the admin content form for populating the template with data.
* A `*-schema.json` file that can be used to validate the data in content.
* A `*-content-example.json` file that supplies an example of content for the template.

See [https://github.com/os2display/display-templates](https://github.com/os2display/display-templates) for how to add a new template to the repository.

### The component

A component will be created like below

```html
<ExampleComponent
  slide="{slide}"
  slideDone="{slideDone}"
  content="{slide.content}"
  run="{run}"
/>
```

**slide**: The slide object.

**slideDone**: A function that is called when the slide is done.

**content**: The slide content.

**run**: A date string that will be set when the slide should start executing.

The slide is responsible for signaling that it is done executing.
This is done by calling the slideDone() function.
If the slide should just run for X milliseconds then you can use the BaseSlideExecution class to handle this.
See the example below.

```javascript
/**
 * Setup slide run function.
 */
const slideExecution = new BaseSlideExecution(slide, slideDone);
useEffect(() => {
  if (run) {
    slideExecution.start(content.duration);
  } else {
    slideExecution.stop();
  }

  return function cleanup() {
    slideExecution.stop();
  };
}, [run]);
```

### Dark mode

A screen can be configured to change color scheme (light/dark) at sunset and sunrise.
To support this a class ("color-scheme-dark") is set on the html root when dark mode
is active. See https://github.com/os2display/display-templates/blob/develop/src/GlobalStyles.js#L170.

### Screen orientation

To handle screens in both Landscape and Portrait mode it is preferred to use the orientation media-query.

Styling for Portrait can be placed inside a query like this:

```css
@media (orientation: portrait) { ... }
```


### Video

When using the video template the video will not play in the client unless the autoplay flag is enabled in the chrome configuration.

### The admin description.

To populate the slide with data an admin form is needed.

This is configured in a json file:

* **input**: The type of the input field. Supported types:
  * **input**: Regular html5 input.
  * **header**: Headline.
  * **header-h3**: Sub-headline.
  * **select**: Select.
  * **checkbox**: Checkbox.
  * **rich-text-input**: Text field with support for html.
  * **image**: Upload image(s) or select from media archive.
  * **video**: Upload video(s) or select from media archive.
  * **file**: Upload file(s) or select from media archive.
  * **duration**: Slide duration field.
  * **contacts**: Create contacts entries
  * **feed**: Configure a feed for the slide.
  * **table**: Create table content.
  * **textarea**: Textarea.
* **name**: A name, should be unique. This is the field in slide.content what will be set.
* **type**: text, number or email, for **input** type.
* **label**: Label for the input
* **helpText**: A helptext for the input
* **required**: Whether it is required data
* **formGroupClasses**: For styling, bootstrap, e.g. mb-3
* **options**: An array of options {name,id} for the select

The following example is the `-admin.json` file for the image and text template.
See others in [https://github.com/os2display/display-templates/tree/develop/build](https://github.com/os2display/display-templates/tree/develop/build).

```json
[
  {
    "input": "header",
    "text": "Skabelon: Tekst og billede",
    "name": "header",
    "formGroupClasses": "h4 mb-3"
  },
  {
    "input": "header-h3",
    "text": "Indhold",
    "name": "header",
    "formGroupClasses": "h5 mb-3"
  },
  {
    "input": "input",
    "name": "title",
    "type": "text",
    "label": "Overskrift",
    "helpText": "Her kan du skrive slidets overskrift",
    "required": true,
    "formGroupClasses": "col-md-6 mb-3"
  },
  {
    "input": "input",
    "name": "text",
    "type": "text",
    "label": "Tekst på slide",
    "helpText": "Her kan du skrive teksten til slidet",
    "formGroupClasses": "col-md-6"
  },
  {
    "input": "image",
    "name": "image",
    "label": "Billede"
  },
  {
    "input": "header-h3",
    "text": "Opsætning",
    "name": "header",
    "formGroupClasses": "h5 mb-3"
  },
  {
    "input": "input",
    "name": "duration",
    "type": "number",
    "label": "Varighed",
    "helpText": "Her skal du skrive varigheden på slidet",
    "required": true,
    "formGroupClasses": "col-md-6 mb-3"
  },
  {
    "input": "select",
    "required": true,
    "label": "Hvor skal tekstboksen være placeret",
    "formGroupClasses": "col-md-6 mb-3",
    "options": [
      {
        "name": "Toppen",
        "id": "top"
      },
      {
        "name": "Højre",
        "id": "right"
      },
      {
        "name": "Bunden",
        "id": "bottom"
      },
      {
        "name": "Venstre",
        "id": "left"
      }
    ],
    "name": "box-align"
  },
  {
    "input": "checkbox",
    "label": "Margin rundt om tekst",
    "name": "text-margin",
    "formGroupClasses": "col-lg-3 mb-3"
  },
  {
    "input": "checkbox",
    "label": "Animeret tekst under overskrift",
    "name": "seperator",
    "formGroupClasses": "col-lg-3 mb-3"
  },
  {
    "input": "checkbox",
    "label": "Teksten optager højest 50% af skærmen",
    "name": "half_size",
    "formGroupClasses": "col-lg-3 mb-3"
  },
  {
    "input": "checkbox",
    "label": "Overskriften er under teksten",
    "helpText": "Denne kan ikke kombineres med den animerede tekst under overskriften",
    "name": "reversed",
    "formGroupClasses": "col-lg-3"
  }
]
```
