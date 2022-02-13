<template>
  <div>
    <v-row class="inputsBar">
      <v-col cols="3">
        <input-filter @input="getValue" />
      </v-col>
      <v-col cols="3">
        <select-filter :items-list="getLocalesArray" @change="changeLanguage" :label="this.convertLocaleToName(this.$i18n.locale)" />
      </v-col>
      <v-col cols="3">
        <router-link :to="{ path: `/favorites` }">Favorites</router-link>
      </v-col>

    </v-row>

    <v-row>
      <v-col cols="3" v-for="pokemon in filteredPokemons" :key="pokemon.name" >
        <card :infos-url="pokemon.url" @incrementCounterImages="incrementCounterImage" :is-loaded-all-images="isLoadedAllImages"/>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import Card from "@/components/PokemonCard";
import InputFilter from "@/components/inputTextFilter"
import {getAllPokemons} from "@/apis/pokemons";
import SelectFilter from "@/components/SelectFilter";
import ViewsConstants from "./views-constants"


export default {
  name: "Home",
  components: {
    Card,
    InputFilter,
    SelectFilter
  },
  data() {
    return {
      inputValue: "",
      pokemons : [],
      counterImage: 0,
      isLoadedAllImages: false,
    }
  },
  computed : {
    filteredPokemons : function(){
      if(this.$store.state.pokemons.length > 0) return this.$store.state.pokemons.filter((pokemon) => pokemon.name.includes(this.inputValue))
      return this.pokemons.results?.filter((pokemon) => pokemon.name.includes(this.inputValue))
    },
    getLocalesArray() {
      let locales = []
      this.$i18n.locale === ViewsConstants.SHORTCUT_FRENCH ? locales = [ViewsConstants.FRENCH_IN_FRENCH, ViewsConstants.ENGLISH_IN_FRENCH] : locales = [ViewsConstants.FRENCH_IN_ENGLISH, ViewsConstants.ENGLISH_IN_ENGLISH]
      return locales
    }
  },
  async mounted() {
    if(this.$store.state.pokemons.length !== 0) {
      this.pokemons.results = this.$store.state.pokemons
    } else {
      await this.filteredData()
    }
  },

  methods: {
    getValue(value) {
      this.inputValue = value;
    },
    async filteredData() {
      try {
        const pokemons = await getAllPokemons()
        await this.$store.dispatch('getPokemons', pokemons.results)
        this.pokemons = pokemons
      } catch(e) {
        console.error(e)
      }
    },
    incrementCounterImage() {
      this.counterImage ++
      if(this.pokemons.results?.length === this.counterImage) this.isLoadedAllImages = true
    },
    changeLanguage(chosenLanguage) {
      this.$i18n.locale = this.convertNameToLocale(chosenLanguage)
    },
    convertLocaleToName(locale) {
      if(this.$i18n.locale === ViewsConstants.SHORTCUT_ENGLISH) {
        if(locale === ViewsConstants.SHORTCUT_FRENCH) return ViewsConstants.FRENCH_IN_ENGLISH
        if(locale === ViewsConstants.SHORTCUT_ENGLISH) return ViewsConstants.ENGLISH_IN_ENGLISH
      }
      if(this.$i18n.locale === ViewsConstants.SHORTCUT_FRENCH) {
        if(locale === ViewsConstants.SHORTCUT_FRENCH) return ViewsConstants.FRENCH_IN_FRENCH
        if(locale === ViewsConstants.SHORTCUT_ENGLISH) return ViewsConstants.ENGLISH_IN_FRENCH
      }
    },
    convertNameToLocale(name) {
      if(name.toLowerCase() === ViewsConstants.ENGLISH_IN_ENGLISH || name.toLowerCase() === ViewsConstants.ENGLISH_IN_FRENCH) return ViewsConstants.SHORTCUT_ENGLISH
      if(name.toLowerCase() === ViewsConstants.FRENCH_IN_ENGLISH || name.toLowerCase() === ViewsConstants.FRENCH_IN_FRENCH) return ViewsConstants.SHORTCUT_FRENCH
    }

  }
};
</script>

<style scoped>
.inputsBar {
  margin-top: 30px;
  margin-left: 30px;
}

</style>
