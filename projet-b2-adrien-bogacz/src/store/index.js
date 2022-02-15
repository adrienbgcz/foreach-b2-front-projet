import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";


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
      state.favorites.push(pokemon)
    },
    deleteFavorite: function (state, pokemonId) {
      console.log(state.favorites)
      console.log(pokemonId)
      const favoriteToDelete = state.favorites.filter(pokemon => pokemonId === pokemon.data.id)

      console.log("Favorite to delete", favoriteToDelete[0].data.id)

      state.favorites.forEach((favorite, index) => {
        if(favorite.data.id === favoriteToDelete[0].data.id) {
           state.favorites.splice(index, 1)
         }
      })
    }
  },
  actions: {
    async getPokemons(context, pokemonsList) {
        context.commit('addPokemonsList', pokemonsList)
    }
  },
  modules: {},
  plugins: [createPersistedState({
    paths: ['favorites']
  })]
});
