<template>
  <footer class="footer">
      <span>
        Created by <a :href="$options.authorWebsite" target="_blank">{{ $options.authorName }}</a>.
        NFL data provided by <a :href="$options.apiWebsite" target="_blank">{{ $options.apiName }}</a>.</span>
  </footer>
</template>

<script>
export default {
  apiWebsite: process.env.VUE_APP_API_WEBSITE,
  apiName: process.env.VUE_APP_API_NAME,
  authorName: process.env.VUE_APP_AUTHOR_NAME,
  authorWebsite: process.env.VUE_APP_AUTHOR_WEBSITE
}
</script>

<style lang="scss" scoped>
.footer {
  max-width: 40rem;
  margin: 3rem auto 3rem auto;
  font-size: 1.1em;
}
</style>