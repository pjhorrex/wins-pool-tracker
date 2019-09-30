<template>
  <div class="team-results-table">
    <div class="team-results-header">
      <standings-table-row :nflTeamRow="false" :results="{name: gamesBack, win: 'W', loss: 'L', tie: 'T'}" :tableHeader="true" :playerRow="false" />
    </div>
    <div class="team-results-body">
      <standings-table-row :nflTeamRow="false" :results="standingsTable" :tableHeader="false" :playerRow="true" />
      <standings-table-row :nflTeamRow="true" v-for="team in standingsTable.standings" :key="team.team" :results="team" :tableHeader="false" :playerRow="false" />
    </div>
    <div class="team-draft-picks">
      <span class="team-draft-picks-desc">PICKS:&nbsp;</span>
      <span class="team-draft-picks-pick" v-for="pick in standingsTable.draftpicks" :key="pick">{{ pick }}</span>
    </div>
  </div>
</template>

<script>
const StandingsTableRow = () => import(/* webpackChunkName: "view-toggler" */ '@/components/StandingsTableRow')

export default {
  components: {
    'standings-table-row': StandingsTableRow
  },
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

      const wholePart = ((winDiff - lossDiff) / 2 === 0.5) ? '' : Math.floor((winDiff - lossDiff) / 2)
      const decimalPart = ((winDiff - lossDiff) % 2) === 1 ? '½' : ''
      const gamesBack = wholePart + decimalPart

      return gamesBack === "0" ? 'LEADER' : gamesBack
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

}

</style>