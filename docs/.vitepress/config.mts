import { cpSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { sidebar } from './sidebar.mts'

export default withMermaid(
  defineConfig({
    title: 'OS2display Documentation',
    description:
      'Documentation for using, hosting and developing the OS2display project',

    lang: 'da-DK',
    srcDir: '.',
    outDir: '../_site',
    // Pages are linked from elsewhere as <path>.html (the Jekyll URLs), so
    // keep emitting .html files. GitHub Pages also serves them without the
    // extension.
    cleanUrls: false,
    // The just-the-docs theme was light only.
    appearance: false,

    // Empty placeholder page, Jekyll copied it as a raw file.
    srcExclude: ['user_manual/slide_templates/vimeo_player.md'],

    head: [['link', { rel: 'icon', href: '/assets/site/favicon.ico' }]],

    vite: {
      server: {
        allowedHosts: true,
      },
      optimizeDeps: {
        // mermaid 11.17 depends on fastdom, a CommonJS package with no ESM
        // default export. Vite serves it raw to the dev client unless it is
        // pre-bundled, and the resulting SyntaxError kills the app before it
        // mounts. Production builds handle the interop themselves.
        include: ['fastdom', 'fastdom/extensions/fastdom-promised.js'],
      },
    },

    lastUpdated: true,

    // Jekyll published images under their source paths (/assets/...,
    // /hosting/sso_setup/*.jpg) and they may be linked from outside. VitePress
    // only emits hashed copies of the images that pages reference, so also
    // copy the originals into the build.
    buildEnd({ srcDir, outDir }) {
      cpSync(join(srcDir, 'assets'), join(outDir, 'assets'), {
        recursive: true,
      })
      cpSync(
        join(srcDir, 'hosting/sso_setup'),
        join(outDir, 'hosting/sso_setup'),
        { recursive: true, filter: (src) => !src.endsWith('.md') },
      )
    },

    themeConfig: {
      logo: '/assets/site/os2display_Logo.svg',
      siteTitle: false,

      nav: [
        { text: 'OS2Display på os2.eu', link: 'https://www.os2.eu/os2display' },
      ],
      sidebar: sidebar(),

      socialLinks: [
        { icon: 'github', link: 'https://github.com/os2display/os2display' },
      ],

      editLink: {
        pattern:
          'https://github.com/os2display/os2display-docs/edit/main/docs/:path',
        text: 'Rediger siden på GitHub',
      },

      lastUpdated: {
        text: 'Senest opdateret',
        formatOptions: {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          forceLocale: true,
        },
      },

      docFooter: {
        prev: 'Forrige side',
        next: 'Næste side',
      },
      outline: { label: 'På denne side' },
      returnToTopLabel: 'Til toppen',
      sidebarMenuLabel: 'Menu',

      search: {
        provider: 'local',
        options: {
          translations: {
            button: { buttonText: 'Søg', buttonAriaLabel: 'Søg' },
            modal: {
              noResultsText: 'Ingen resultater for',
              resetButtonTitle: 'Nulstil søgning',
              footer: {
                selectText: 'vælg',
                navigateText: 'naviger',
                closeText: 'luk',
              },
            },
          },
        },
      },
    },
  }),
)
