import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import StandingsTable from '@/components/StandingsTable'

describe('StandingsTable.vue', () => {
  it('calculates 0  games back from an equal record', () => {
    const expected = '0'
    const wrapper = shallowMount(StandingsTable, {
      propsData: { 
        leader:         {"win":2,"loss":0,"tie":0},
        standingsTable: {"win":2,"loss":0,"tie":0},
      }
    })

    expect(wrapper.vm.gamesBack).to.equal(expected)
  })

  it('calculates 1½ games back from a tie', () => {
    const expected = '1½'
    const wrapper = shallowMount(StandingsTable, {
      propsData: { 
        leader:         {"win":2,"loss":0,"tie":0},
        standingsTable: {"win":0,"loss":1,"tie":1},
      }
    })
    expect(wrapper.vm.gamesBack).to.equal(expected)
  })
  
  it('calculates 1½ games back from an extra game', () => {
    const expected = '1½'
    const wrapper = shallowMount(StandingsTable, {
      propsData: { 
        leader:         {"win":2,"loss":0,"tie":0},
        standingsTable: {"win":1,"loss":2,"tie":0},
      }
    })
    expect(wrapper.vm.gamesBack).to.equal(expected)
  })

  it('calculates ½ game back without a leading zero', () => {
    const expected = '½'
    const wrapper = shallowMount(StandingsTable, {
      propsData: { 
        leader:         {"win":2,"loss":0,"tie":0},
        standingsTable: {"win":1,"loss":0,"tie":1},
      }
    })
    expect(wrapper.vm.gamesBack).to.equal(expected)
  })
})