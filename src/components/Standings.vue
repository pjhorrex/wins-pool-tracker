<template>
  <div id='standings'>
    <div class="team-results-table" v-for="standing in standings" :key="standing.id">
      <div class="team-results-header">
        <div class="team-results-row header-row">
          <div class="team-results-row-name" v-if="calcGamesBack(standing) != 0">GB:&nbsp;{{ calcGamesBack(standing) }}</div>
          <div class="team-results-row-name" v-else>LEADER</div>
          <div class="team-results-row-result">W</div>
          <div class="team-results-row-result">L</div>
          <div class="team-results-row-result">T</div>
        </div>
      </div>
      <div class="team-results-body">
        <div class="team-results-row player-header">
          <div class="team-results-row-name">{{ standing.name }}</div>
          <div class="team-results-row-result">{{ standing.win }}</div>
          <div class="team-results-row-result">{{ standing.loss }}</div>
          <div class="team-results-row-result">{{ standing.tie }}</div>
        </div>
        <div class="team-results-row nfl-team-row" v-for="team in standing.standings" :key="team.team">
          <div class="team-results-row-name nfl-team"><span :id="team.team">{{ team.team }}</span></div>
          <div class="team-results-row-result">{{ team.win }}</div>
          <div class="team-results-row-result">{{ team.loss }}</div>
          <div class="team-results-row-result">{{ team.tie }}</div>
        </div>
      </div>
      <div class="team-draft-picks">
        <span class="team-draft-picks-desc">PICKS:&nbsp;</span>
        <span class="team-draft-picks-pick" v-for="pick in standing.draftpicks" :key="pick">{{ pick }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    standings: {
      type: Array
    }
  },
  methods: {
    calcGamesBack: function (currPlayer) {
      const firstPlayer = this.standings[0]
      const winDiff = firstPlayer.win - currPlayer.win
      const lossDiff = firstPlayer.loss - currPlayer.loss

      const wholePart = Math.floor((winDiff - lossDiff) / 2)
      const decimalPart = ((winDiff - lossDiff) % 2) === 1 ? '½' : ''

      return wholePart + decimalPart
    }
  }
}

</script>

<style lang="scss" scoped>
#standings {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  max-width: 75rem;
  margin: 0 auto;
  font-size: 2.2em;
}

@media screen and (min-width: 1500px) {
  #standings {
    max-width: 150rem;
  }
}

.team-results-table {
  margin: 1rem;
  padding: 1.5rem;
  background-color: $white;
  border-radius: 1.5rem;
  flex: 0 1 32rem;

  .team-results-header,
  .team-results-body {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
  }

  .team-results-row {
    display: flex;
    flex-direction: row;
    font-weight: bold;
    width: 100%;
    padding: 0.5rem 0;

    &.player-header {
      border-radius: 8px;
    }

    &:not(.nfl-team-row):not(.header-row) {
      background-color: $dark;
      color: $white;
    }
  }

  .team-results-row-name,
  .team-results-row-result {
    padding: 0.5rem 0;
    display: flex;
  }

  .team-results-row-name {
    padding-left: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 1rem;
    flex: 1 1 15rem;
    justify-content: left;
  }
  
  .team-results-row-result {
    flex: 0 0 5rem;
    justify-content: center;
  }

  .nfl-team-row {
    color: $medium;

    &:not(:last-child) {
      border-bottom: 0.2rem $light dotted;
    }
  }

  .nfl-team > span {
    width: 6rem;
    opacity: 0.75;
    border-radius: 0.5rem;
  }

  .team-draft-picks {
    padding-top: 0.5rem;
    font-size: 0.727em;
    color: $medium;
  }

  .team-draft-picks-pick:not(:last-child)::after {
    content: ",#{ map-get($symbols, "nbsp") }";
  }

  @include format-teams($teams-map)
}

</style>
