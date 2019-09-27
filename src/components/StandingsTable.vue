<template>
  <div class="team-results-table">
    <div class="team-results-header">
      <div class="team-results-row header-row">
        <div class="team-results-row-name" v-if="gamesBack != 0">GB:&nbsp;{{ gamesBack }}</div>
        <div class="team-results-row-name" v-else>LEADER</div>
        <div class="team-results-row-result">W</div>
        <div class="team-results-row-result">L</div>
        <div class="team-results-row-result">T</div>
      </div>
    </div>
    <div class="team-results-body">
      <div class="team-results-row player-header">
        <div class="team-results-row-name">{{ standingsTable.name }}</div>
        <div class="team-results-row-result">{{ standingsTable.win }}</div>
        <div class="team-results-row-result">{{ standingsTable.loss }}</div>
        <div class="team-results-row-result">{{ standingsTable.tie }}</div>
      </div>
      <div class="team-results-row nfl-team-row" v-for="team in standingsTable.standings" :key="team.team">
        <div class="team-results-row-name nfl-team"><span :id="team.team">{{ team.team }}</span></div>
        <div class="team-results-row-result">{{ team.win }}</div>
        <div class="team-results-row-result">{{ team.loss }}</div>
        <div class="team-results-row-result">{{ team.tie }}</div>
      </div>
    </div>
    <div class="team-draft-picks">
      <span class="team-draft-picks-desc">PICKS:&nbsp;</span>
      <span class="team-draft-picks-pick" v-for="pick in standingsTable.draftpicks" :key="pick">{{ pick }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    standingsTable: {
      type: Object
    },
    leader: {
      type: Object
    }
  },
  computed: {
    gamesBack: function () {
      const winDiff = this.leader.win - this.standingsTable.win
      const lossDiff = this.leader.loss - this.standingsTable.loss

      const wholePart = Math.floor((winDiff - lossDiff) / 2)
      const decimalPart = ((winDiff - lossDiff) % 2) === 1 ? '½' : ''

      return wholePart + decimalPart
    }
  }
}

</script>

<style lang="scss" scoped>
.team-results-table {
  margin: 1rem;
  padding: 1.5rem;
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
    &:not(:last-child) {
      border-bottom: 0.2rem dotted;
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
  }

  .team-draft-picks-pick:not(:last-child)::after {
    content: ",#{ map-get($symbols, "nbsp") }";
  }

  @include format-teams($teams-map)
}

</style>