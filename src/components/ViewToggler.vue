<template>
    <div class="view-toggle-button">
      <span class="toggle-button" id="player-standings-toggle" @click="clickStandingsToggle" :class="{ active: playerStandingsActive }">
        <FontAwesomeIcon icon="th" class="fa-fw"/>
      </span>
      <span class="toggle-button" id="team-standings-toggle" @click="clickStandingsToggle" :class="{ active: teamsStandingsActive }">
        <FontAwesomeIcon icon="th-list" class="fa-fw"/>
      </span>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTh } from '@fortawesome/free-solid-svg-icons'
import { faThList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTh, faThList)

export default {
  components: {
    FontAwesomeIcon
  },
  data: function () {
    return {
      playerStandingsActive: true,
      teamsStandingsActive: false
    }
  },
  methods: {
    clickStandingsToggle: function (event) {
      const id = event.currentTarget.id

      if(id === 'player-standings-toggle') {
        this.playerStandingsActive = true
        this.teamsStandingsActive = false
        this.$emit('show-view', 'player-view')
      } else if (id === 'team-standings-toggle') {
        this.playerStandingsActive = false
        this.teamsStandingsActive = true
        this.$emit('show-view', 'team-view')
      }
    }
  }
}

</script>

<style lang="scss">
.view-toggle-button {
  font-size: 2em;
  margin-bottom: 2rem;

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
