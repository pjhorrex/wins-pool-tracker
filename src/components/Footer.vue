<template>
  <footer class="footer">
      <span>
        Created by <a :href="$options.authorWebsite" target="_blank">{{ $options.authorName }}</a>.
        NFL data provided by <a :href="$options.apiWebsite" target="_blank">{{ $options.apiName }}</a>.
      </span>
      <ul>
        <li><a :href="$options.vueWebsite" target="_blank"><FontAwesomeIcon :icon="['fab', 'vuejs']" class="fa-fw" /></a></li>
        <li><a :href="$options.faWebsite" target="_blank"><FontAwesomeIcon :icon="['fab', 'font-awesome']" class="fa-fw" /></a></li>
      </ul>
  </footer>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVuejs } from '@fortawesome/free-brands-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'

library.add(faVuejs, faFontAwesome, faSun, faMoon)

export default {
  apiWebsite: process.env.VUE_APP_API_WEBSITE,
  apiName: process.env.VUE_APP_API_NAME,
  authorName: process.env.VUE_APP_AUTHOR_NAME,
  authorWebsite: process.env.VUE_APP_AUTHOR_WEBSITE,
  vueWebsite: 'https://vuejs.org/',
  faWebsite: 'https://fontawesome.com/',
  components: { FontAwesomeIcon }
}
</script>

<style lang="scss" scoped>
.footer {
  max-width: 40rem;
  margin: 3rem auto 3rem auto;
  font-size: 1.1em;
}

ul {
  margin: 2rem 0 0 0;
  padding: 0;
  display: flex;
  list-style-type: none;
  justify-content: center;
  font-size: 2.5em;

  li {
    margin: 0 0.5rem;

    a {
      border-radius: 0.5rem;
    }
  }
}
</style>