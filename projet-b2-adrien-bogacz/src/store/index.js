import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemons: [],
    favorites: [],
  },
  mutations: {
    addPokemonsList(state, pokemonsList) {
      state.pokemons = pokemonsList;
    },
    addFavorite(state, pokemon) {
      let found = state.favorites.some(favorite => favorite.data.id === pokemon.data.id)
      if(!found) state.favorites.push(pokemon)
    },
    deleteFavorite: function (state, pokemonId) {
      const favoriteToDelete = state.favorites.find((pokemon) => pokemonId === pokemon.data.id);
      state.favorites.forEach((favorite, index) => {
        if (favorite.data.id === favoriteToDelete.data.id) state.favorites.splice(index, 1);
      });
    },
  },
  actions: {
    async getPokemons(context, pokemonsList) {
      context.commit("addPokemonsList", pokemonsList);
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      paths: ["favorites"],
    }),
  ],
});
