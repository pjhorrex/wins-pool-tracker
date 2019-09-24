<template>
    <div class="view-toggle-button">
      <span class="toggle-button" :click="clickPlayerStandings" :class="{ active: playerStandingsActive }">
        <FontAwesomeIcon icon="th" :click="clickTeamStandings" class="fa-fw"/>
      </span>
      <span class="toggle-button" :class="{ active: teamsStandingsActive }">
        <FontAwesomeIcon icon="list" class="fa-fw"/>
      </span>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTh } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTh, faList)

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
    clickPlayerStandings: function (event) {
      this.playerStandingsActive = true;
      this.teamsStandingsActive = false;
    },
    clickTeamStandings: function (event) {
      this.playerStandingsActive = false;
      this.teamsStandingsActive = true;
    }
  }
}

</script>

<style lang="scss">
.view-toggle-button {
  font-size: 2em;
  margin-bottom: 2rem;

  .active {
    border: 0.2rem solid $dark;
    background-color: $dark;
    color: $light;
    border-radius: 0.5rem;
  }

  .toggle-button {
    margin: 0.2rem;
    padding: 0.5rem;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
