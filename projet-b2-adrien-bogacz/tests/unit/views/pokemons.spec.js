import { shallowMount, createLocalVue } from "@vue/test-utils";
import Pokemons from "../../../src/views/Pokemons.vue";
import Vuex from 'vuex'
import {getAllPokemons} from "@/apis/pokemons";
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

jest.mock('../../../src/apis/pokemons.js', () => ({
  getAllPokemons: jest.fn(async () => {
    return Promise.resolve([
      {name: 'pokemon1', id: 1},
      {name: 'pokemon2', id: 2}
    ])
  })
}))


describe('Pokemon.vue', () => {
  let store;
  let options;
  let state;
  let actions

  beforeEach(() => {
    state = {
      pokemons : [{name:"pokemon1", id:1}, {name: 'pokemon2', id: 2}]
    }

    actions = {
      getPokemons: jest.fn()
    }

    store = new Vuex.Store({
      state,
      actions
    })

    options = {
      localVue,
      store,
      mocks: {
        $i18n: {
          locale: "test"
        }
      }
    }
  })


  describe('filteredData', () => {
    it('fetches and sets pokemons on 200', async () => {
      //* arrange
      const wrapper = shallowMount(Pokemons, options)


      //* act
      await wrapper.vm.filteredData()

      //* assert
      expect(getAllPokemons).toHaveBeenCalled() // on vérifie que l'api est bien appelée dans la méthode filteredData qu'on veut tester
      expect(wrapper.vm.pokemons).toEqual([
        {name:"pokemon1", id:1},
        {name: 'pokemon2', id: 2}
      ])
    })

  })
})
