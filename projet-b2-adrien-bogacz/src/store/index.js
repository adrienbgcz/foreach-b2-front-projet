import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemons: [],
    favorites: []
  },
  mutations: {
    addPokemonsList(state, pokemonsList) {
      state.pokemons = pokemonsList
    },
    addFavorite(state, pokemon) {
      state.favorites = [...state.favorites, pokemon]
      console.log(state.favorites)
    },
  },
  actions: {
    async getPokemons(context, pokemonsList) {
        context.commit('addPokemonsList', pokemonsList)
    }
  },
  modules: {},
});
