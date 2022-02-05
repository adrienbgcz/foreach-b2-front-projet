<template>
  <div>
    <v-row class="inputsBar">
      <v-col cols="3">
        <input-filter @input="getValue" />
      </v-col>
      <v-col cols="3">
        <select-filter :items-list="getLocalesArray" @change="changeLanguage" :label="this.convertLocaleToName(this.$i18n.locale)" />
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
import SelectFilter from "@/components/SelectFilter"


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
      /*locales : this.getLocalesArray()*/
    }
  },
  computed : {
    filteredPokemons : function(){
      if(this.$store.state.pokemons.length > 0) return this.$store.state.pokemons.filter((pokemon) => pokemon.name.includes(this.inputValue))
      return this.pokemons.results?.filter((pokemon) => pokemon.name.includes(this.inputValue))
    },
    getLocalesArray() {
      let locales = []
      console.log(this.$i18n.locale)
      this.$i18n.locale === 'fr' ? locales = ['Français', 'Anglais'] : locales = ['French', 'English']
      console.log(locales)
      return locales
    }
  },
  async mounted() {

    if(this.$store.state.pokemons.length !== 0) {
      console.log("ici")
      console.log(this.isLoadedAllImages)
      this.pokemons.results = this.$store.state.pokemons
      console.log(this.pokemons)
    } else {
      console.log("là")
      await this.filteredData()
    }
  },

  methods: {
    getValue(value) {
      this.inputValue = value;
      console.log(this.inputValue)
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
      /*console.log(this.counterImage)
      console.log(this.pokemons.results?.length)*/
      if(this.pokemons.results?.length === this.counterImage) this.isLoadedAllImages = true
    },
    /*getLocalesArray() {
      let locales = []
      console.log(this.$i18n.locale)
      this.$i18n.locale === 'fr' ? locales = ['Français', 'Anglais'] : locales = ['French', 'English']
      console.log(locales)
      return locales
    },*/
    changeLanguage(chosenLanguage) {
      console.log(chosenLanguage)
      console.log(this.convertNameToLocale(chosenLanguage))
      this.$i18n.locale = this.convertNameToLocale(chosenLanguage)

      /*this.locales = this.getLocalesArray()
      console.log(this.locales)*/
    },
    convertLocaleToName(locale) {
      if(this.$i18n.locale === "en") {
        if(locale === "fr") return "French"
        if(locale === "en") return "English"
      }
      if(this.$i18n.locale === "fr") {
        if(locale === "fr") return "Français"
        if(locale === "en") return "Anglais"
      }
    },
    convertNameToLocale(name) {
      console.log(name)
      if(name.toLowerCase() === "english" || name.toLowerCase() === "anglais") return "en"
      if(name.toLowerCase() === "french" || name.toLowerCase() === "français") return "fr"
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
