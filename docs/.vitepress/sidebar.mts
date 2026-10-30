import type { DefaultTheme } from 'vitepress'

// Mirrors the just-the-docs navigation (title, parent and nav_order front
// matter). Hand-written because that hierarchy does not follow the folders,
// e.g. CHANGELOG.md sits at the root but belongs under "For driftsleverandører".
export function sidebar(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Home', link: '/' },
    {
      text: 'Sådan bruger du OS2Display',
      collapsed: false,
      items: [
        { text: 'Log ind', link: '/user_manual/log_in' },
        { text: 'Hovedmenuen', link: '/user_manual/hovedmenuen' },
        { text: 'Skærme', link: '/user_manual/skaerme' },
        { text: 'Slides', link: '/user_manual/slides' },
        {
          text: 'Slideskabeloner',
          link: '/user_manual/slide_templates/',
          collapsed: true,
          items: [
            { text: 'Anmeldelse', link: '/user_manual/slide_templates/book_review' },
            { text: 'BRND booking', link: '/user_manual/slide_templates/brnd' },
            { text: 'Billede og tekst', link: '/user_manual/slide_templates/image_text' },
            { text: 'IFrame', link: '/user_manual/slide_templates/iframe' },
            { text: 'Instagram Feed', link: '/user_manual/slide_templates/instagram_feed' },
            { text: 'Kalender', link: '/user_manual/slide_templates/calendar' },
            { text: 'Kontakter', link: '/user_manual/slide_templates/contacts' },
            { text: 'Nyheder', link: '/user_manual/slide_templates/news_feed' },
            { text: 'Plakat', link: '/user_manual/slide_templates/poster' },
            { text: 'RSS-feed', link: '/user_manual/slide_templates/rss' },
            { text: 'Rejseplanen', link: '/user_manual/slide_templates/travel' },
            { text: 'Slideshow', link: '/user_manual/slide_templates/slideshow' },
            { text: 'Tabel', link: '/user_manual/slide_templates/table' },
            { text: 'Video', link: '/user_manual/slide_templates/video' },
          ],
        },
        { text: 'Spillelister', link: '/user_manual/spillelister' },
        { text: 'Kampagner', link: '/user_manual/kampagner' },
        { text: 'Delte spillelister', link: '/user_manual/delte_spillelister' },
        { text: 'Grupper', link: '/user_manual/grupper' },
        { text: 'Brugere', link: '/user_manual/brugere' },
        { text: 'Indstillinger', link: '/user_manual/indstillinger' },
        { text: 'Klienter', link: '/user_manual/klienter' },
        { text: 'Troubleshooting', link: '/user_manual/troubleshooting' },
        { text: 'Afspilningsenheder', link: '/user_manual/playback_devices' },
      ],
    },
    { text: 'Fejl og udviklingsønsker', link: '/issue_tracker' },
    {
      text: 'For driftsleverandører',
      link: '/hosting/',
      collapsed: true,
      items: [
        { text: 'Changelog', link: '/CHANGELOG' },
        { text: 'Hosting', link: '/hosting/hosting' },
        { text: 'SSO Setup', link: '/hosting/sso_setup/sso_setup' },
      ],
    },
    {
      text: 'For udviklere',
      collapsed: true,
      items: [
        { text: 'Development Setup', link: '/development/development' },
        {
          text: 'Components',
          link: '/development/components/components',
          collapsed: true,
          items: [
            {
              text: 'API',
              link: '/development/components/api-service',
              items: [
                { text: 'Security', link: '/development/components/api-service/security' },
              ],
            },
            { text: 'Admin (Editor)', link: '/development/components/admin' },
            { text: 'Client (Screen)', link: '/development/components/client' },
          ],
        },
        {
          text: 'Content Structure',
          link: '/development/content_structure/content_structure',
          collapsed: true,
          items: [
            { text: 'Layouts', link: '/development/content_structure/layouts' },
            { text: 'Templates', link: '/development/content_structure/templates' },
            { text: 'Feeds', link: '/development/content_structure/feeds' },
            { text: 'Themes', link: '/development/content_structure/themes' },
            { text: 'Testing Guide', link: '/development/content_structure/test_guide' },
            { text: 'Screen status', link: '/development/content_structure/screen-status' },
          ],
        },
      ],
    },
    { text: 'Om OS2Display', link: '/about/' },
    { text: 'Nyheder', link: '/news/' },
    { text: 'OS2Display på GitHub', link: 'https://github.com/os2display/os2display' },
  ]
}
