# OS2Display documentation readme

This repository contains documentation for OS2Display. The documentation is build with
[VitePress](https://vitepress.dev/) and published to <https://os2display.os2.eu/> using Github actions.

To update the documentation please make a pull request to this repository.

Your PR should use standard markdown. The pages live in `docs/` and the URL of a page follows its path,
e.g. `docs/hosting/hosting.md` is published as `/hosting/hosting.html`. New pages must be added to the
sidebar in `docs/.vitepress/sidebar.mts`. News posts go in `docs/news/` with `title`, `date` and `summary`
front matter and are listed on the front page automatically.

## Local development

Run the development server on <http://localhost:5173/>:

```shell
docker compose up
```

Or, with Node.js installed, `npm install` and `npm run docs:dev`. Build the site to `_site/` with
`npm run docs:build`.
