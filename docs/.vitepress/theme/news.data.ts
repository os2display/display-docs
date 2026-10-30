import { createContentLoader } from 'vitepress'

// News posts in docs/news/, newest first. Replaces the Jekyll news collection.
export default createContentLoader('news/*.md', {
  transform: (pages) =>
    pages
      .filter((page) => page.frontmatter.date)
      .sort(
        (a, b) =>
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime(),
      ),
})
