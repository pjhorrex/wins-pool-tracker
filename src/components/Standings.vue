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
      console.log((winDiff - lossDiff) % 2)

      return wholePart + decimalPart
    }
  }
}

</script>

<style lang="scss" scoped>
  @import '../sass/variables.scss';

  #standings {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    max-width: 750px;
    margin: 0 auto;
  }

  @media screen and (min-width: 1500px) {
    #standings {
      max-width: 1500px;
    }
  }

  .team-results-table {
    margin: 10px;
    padding: 15px;
    background-color: $light;
    border-radius: 15px;
    flex: 0 1 320px;
  }

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
    font-size: 22px;
    font-weight: bold;
    width: 100%;
    padding: 5px 0;

    &.player-header {
      border-radius: 8px;
    }
  }

  .team-results-row:not(.nfl-team-row):not(.header-row) {
    background-color: $dark;
    color: $light;
  }

  .nfl-team-row:not(:last-child) {
    border-bottom: 2px $medium-light dotted;
  }

  .team-results-row-name,
  .team-results-row-result {
    padding: 5px 0;
    display: flex;
  }

  .team-results-row-name {
    padding-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
  }

  .team-results-row-name {
    flex: 1 1 150px;
    justify-content: left;
  }

  .team-results-row-result {
    flex: 0 0 50px;
    justify-content: center;
  }

  .nfl-team-row {
    color: $medium;
  }

  .nfl-team > span {
    width: 60px;
    opacity: 0.75;
    border-radius: 5px;
  }

  .team-draft-picks {
    padding-top: 5px;
    color: $medium;
  }

  .team-draft-picks-pick:not(:last-child)::after {
    content: ",#{map-get($symbols, "nbsp")}";
  }

  @each $team, $primary, $secondary in $teams {
    .nfl-team > span##{$team} {
      background-color: $primary;
      color: $secondary;
    }
  }

</style>
