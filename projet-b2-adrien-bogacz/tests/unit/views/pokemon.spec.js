import Pokemon from "../../../src/views/Pokemon.vue";
import {shallowMount} from "@vue/test-utils";
import {getPokemon} from "@/apis/pokemons";


jest.mock('../../../src/apis/pokemons.js', () => ({
    getPokemon: jest.fn(async () => {
        return Promise.resolve({id:1, name:'pokemon1', sprites:{other:{dream_world:{front_default:'url'}}}})
    })
}))


describe('Pokemon.vue', () => {
    let options;
    const $t = (key) => key;

    beforeEach(() => {

        options = {
            mocks: {
                $route: {
                    params: {
                        id: 1
                    },
                },
                $router: {
                    go: jest.fn(),
                    push: jest.fn()
                },
                $t
            }
        }
    })

    describe('getCurrentPokemon', () => {
        it('fetch and set one pokemon', async () => {
            //* arrange
            const wrapper = shallowMount(Pokemon, options)

            //* act
            await wrapper.vm.getCurrentPokemon()

            //* assert
            expect(getPokemon).toHaveBeenCalled()
            expect(wrapper.vm.pokemonInfos).toEqual(
                {id:1, name:'pokemon1', sprites:{other:{dream_world:{front_default:'url'}}}}
            )
        })

    })
})



