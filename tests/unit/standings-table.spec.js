import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import StandingsTable from '@/components/StandingsTable'

const testData = {
  player: {"id":"PHIL","name":"Phil","draft":["NE","GB","IND","WAS"],"standings":[{"team":"NE","name":"New England Patriots","conf":"AFC","div":"East","win":3,"tie":0,"loss":0,"player":{"id":"PHIL","name":"Phil"},"pickNumber":3,"rankNumber":6,"valueNumber":-3},{"team":"GB","name":"Green Bay Packers","conf":"NFC","div":"North","win":3,"tie":0,"loss":1,"player":{"id":"PHIL","name":"Phil"},"pickNumber":13,"rankNumber":7,"valueNumber":6},{"team":"IND","name":"Indianapolis Colts","conf":"AFC","div":"South","win":2,"tie":0,"loss":1,"player":{"id":"PHIL","name":"Phil"},"pickNumber":23,"rankNumber":9,"valueNumber":14},{"team":"WAS","name":"Washington Redskins","conf":"NFC","div":"East","win":0,"tie":0,"loss":3,"player":{"id":"PHIL","name":"Phil"},"pickNumber":29,"rankNumber":29,"valueNumber":0}],"draftpicks":[3,13,23,29],"win":8,"loss":5,"tie":0},
  leader: {"id":"CHRIS","name":"Chris","draft":["LAR","CHI","BUF","TB"],"standings":[{"team":"BUF","name":"Buffalo Bills","conf":"AFC","div":"East","win":3,"tie":0,"loss":0,"player":{"id":"CHRIS","name":"Chris"},"pickNumber":24,"rankNumber":1,"valueNumber":23},{"team":"LAR","name":"Los Angeles Rams","conf":"NFC","div":"West","win":3,"tie":0,"loss":0,"player":{"id":"CHRIS","name":"Chris"},"pickNumber":5,"rankNumber":4,"valueNumber":1},{"team":"CHI","name":"Chicago Bears","conf":"NFC","div":"North","win":2,"tie":0,"loss":1,"player":{"id":"CHRIS","name":"Chris"},"pickNumber":10,"rankNumber":13,"valueNumber":-3},{"team":"TB","name":"Tampa Bay Buccaneers","conf":"NFC","div":"South","win":1,"tie":0,"loss":2,"player":{"id":"CHRIS","name":"Chris"},"pickNumber":25,"rankNumber":19,"valueNumber":6}],"draftpicks":[5,10,24,25],"win":9,"loss":3,"tie":0}
}

describe('StandingsTable.vue', () => {
  it('outputs the correct games back result', () => {
    const expected = '1½'
    const wrapper = shallowMount(StandingsTable, {
      propsData: { 
        leader: testData.leader,
        standingsTable: testData.player
      }
    })

    expect(wrapper.vm.gamesBack).to.equal(expected)
  })
})