<template>
  <div id='standings'>
    <standings-table v-for="standing in standings" :key="standing.id" :standingsTable="standing" :leader="standings[0]"/>
  </div>
</template>

<script>
const StandingsTable = () => import(/* webpackChunkName: "standings-table" */ '@/components/StandingsTable')

export default {
  components: { 'standings-table': StandingsTable },
  props: {
    standings: {
      type: Array
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

</style>
