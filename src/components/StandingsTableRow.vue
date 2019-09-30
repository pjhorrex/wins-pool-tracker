<template>
  <div class="team-results-row" :class="[{'nfl-team-row': nflTeamRow}, {'header-row': tableHeader}, {'player-header': playerRow}]">
    <div class="team-results-row-name nfl-team" v-if="nflTeamRow"><span :id="results.team">{{ results.team }}</span></div>
    <div class="team-results-row-name" v-else><span v-if="tableHeader && results.name != 'LEADER'">GB:&nbsp;</span>{{ results.name }}</div>
    <div class="team-results-row-result">{{ results.win }}</div>
    <div class="team-results-row-result">{{ results.loss }}</div>
    <div class="team-results-row-result">{{ results.tie }}</div>
  </div>
</template>

<script>
export default {
  props: {
    nflTeamRow: {
      type: Boolean,
      required: true
    },
    tableHeader: {
      type: Boolean,
      required: true
    },
    playerRow: {
      type: Boolean,
      required: true
    },
    results: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
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

@include format-teams($teams-map);


</style>