<script setup lang="ts">
import { data as news } from './news.data'

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('da-DK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
</script>

<template>
  <div v-for="item in news" :key="item.url" class="news-item">
    <a class="news-title" :href="item.url">{{ item.frontmatter.title }}</a>
    <p class="news-date">{{ formatDate(item.frontmatter.date) }}</p>
    <p class="news-summary">{{ item.frontmatter.summary }}</p>
  </div>
</template>
