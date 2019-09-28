<template>
    <div class="view-toggle-button">
      <div class="button-group">
        <span class="label">VIEW</span>
        <span class="toggle-button" id="player-view-toggle" @click="clickToggle" :class="{ active: (activeView === $options.views.player) }">
          <FontAwesomeIcon icon="th" class="fa-fw"/>
        </span>
        <span class="toggle-button" id="team-view-toggle" @click="clickToggle" :class="{ active: (activeView === $options.views.team) }">
          <FontAwesomeIcon icon="th-list" class="fa-fw"/>
        </span>
      </div>
      <div class="button-group button-group-theme">
        <span class="toggle-button" id="default-theme-toggle" @click="clickToggle" :class="{ active: (activeTheme === $options.themes.default) }">
          <FontAwesomeIcon icon="sun" class="fa-fw"/>
        </span>
        <span class="toggle-button" id="dark-theme-toggle" @click="clickToggle" :class="{ active: (activeTheme === $options.themes.dark) }">
          <FontAwesomeIcon icon="moon" class="fa-fw"/>
        </span>
        <span class="label">THEME</span>
      </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTh } from '@fortawesome/free-solid-svg-icons'
import { faThList } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTh, faThList, faSun, faMoon, faSquare)

export default {
  components: {
    FontAwesomeIcon
  },
  views: {
    player: 'player-view',
    team: 'team-view'
  },
  themes: {
    default: 'default-theme',
    dark: 'dark-theme',
    eagles: 'eagles-theme'
  },
  data: function () {
    return {
      activeView: this.$options.views.player,
      activeTheme: this.$options.themes.default
    }
  },
  methods: {
    clickToggle: function (event) {
      const id = event.currentTarget.id

      if(id === 'player-view-toggle') {
        this.activeView = this.$options.views.player
        //this.$emit('show-view', this.$options.views.player)
        localStorage.setItem('active-view-button', this.$options.views.player)
      } else if (id === 'team-view-toggle') {
        this.activeView = this.$options.views.team
        //this.$emit('show-view', this.$options.views.team)
        localStorage.setItem('active-view-button', this.$options.views.team)
      } else if (id === 'default-theme-toggle') {
        this.activeTheme = this.$options.themes.default
        //this.$emit('select-theme', this.$options.themes.default)
        localStorage.setItem('active-theme-button', this.$options.themes.default)
      } else if (id === 'dark-theme-toggle') {
        this.activeTheme = this.$options.themes.dark
        //this.$emit('select-theme', this.$options.themes.dark)
        localStorage.setItem('active-theme-button', this.$options.themes.dark)
      } else if (id === 'eagles-theme-toggle') {
        this.activeTheme = this.$options.themes.eagles
        //this.$emit('select-theme', this.$options.themes.eagles)
        localStorage.setItem('active-theme-button', this.$options.themes.eagles)
      }
    }
  },
  watch: {
    activeView: function (newValue) {
        this.$emit('show-view', newValue)
    },
    activeTheme: function (newValue) {
        this.$emit('select-theme', newValue)
    }
  },
  beforeMount: function () {
    const theme = localStorage.getItem('active-theme-button')
    const view = localStorage.getItem('active-view-button')
    if (theme != null ) {
      this.activeTheme = theme
      this.$emit('select-theme', theme)
    }
    if (view != null ) {
      this.activeView = view
      this.$emit('show-view', view)
    }
  }
}

</script>

<style lang="scss" scoped>
@media screen and (max-width: 465px) {
  .view-toggle-button {
    .label {
      display: none;
    }
  }
}

.view-toggle-button {
  font-size: 2em;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;

  .label {
    font-size: 0.75em;
    margin: 0 1rem;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .button-group {
    padding: 0 2rem;
  }

  .toggle-button {
    border: 0.2rem solid;
    // border-color: $light;
    margin: 0.2rem;
    padding: 0.5rem;
    border-radius: 0.5rem;

    &:hover {
      cursor: pointer;
    }

    &.active {
      border: 0.2rem solid;
      // border-color: $dark;
      // background-color: $dark;
      // color: $light;
    }
  }
}

</style>
