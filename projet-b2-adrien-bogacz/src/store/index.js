import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemons: []
  },
  mutations: {
    addPokemonsList(state, pokemonsList) {
      state.pokemons = pokemonsList
    }
  },
  actions: {
    async getPokemons(context, pokemonsList) {
        context.commit('addPokemonsList', pokemonsList)
    }
  },
  modules: {},
});
