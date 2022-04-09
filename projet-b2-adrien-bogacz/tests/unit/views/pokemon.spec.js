import Pokemon from "../../../src/views/Pokemon.vue";
import Vuex from 'vuex'

import VueRouter from 'vue-router'
import {createLocalVue, shallowMount} from "@vue/test-utils";



const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()




jest.mock('../../../src/apis/pokemons.js', () => ({
    getPokemon: jest.fn(async () => {
        return Promise.resolve({name: 'pokemon1', id: 1})
    })
}))


describe('Pokemon.vue', () => {
    let options;
    let data;
    const $t = (key) => key;
    const $route = {
        path: '/some/path'
    }

    beforeEach(() => {

        data = {
            pokemonInfos : {id:1, name:'pokemon1', sprites:{other:{dream_world:{front_default:'url'}}}}
        }

        options = {
            localVue,
            router,
            mocks: {
                $route,
                $t
            }
        }
    })

    describe('mounted', () => {
        it('fetch and set one pokemon', async () => {
            //* arrange
            const wrapper = shallowMount(Pokemon, options)


            //* act
            wrapper.vm.$route.path
            await wrapper.vm.mounted()

            //* assert
            expect(getPokemon).toHaveBeenCalled()
            expect(wrapper.vm.pokemon).toEqual(
                {id:1, name:'pokemon1', sprites:{other:{dream_world:{front_default:'url'}}}}
            )
        })

    })
})



