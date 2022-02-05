<template>
  <div >
    <v-btn @click="goBack">
      <v-icon>mdi-arrow-left</v-icon>
      {{ $t("return-btn")}}
    </v-btn>
    <v-row v-if="pokemons.length > 0">
        <v-col cols="3" v-for="pokemon in pokemons" :key="pokemon.name" >
          <card :infos-url="pokemon.config.url" @incrementCounterImages="incrementCounterImage" :is-loaded-all-images="isLoadedAllImages"/>
        </v-col>
    </v-row>

    <v-row v-else>
      <v-col class="d-flex justify-center">{{ $t("no-favorites")}}</v-col>
    </v-row>

  </div>

</template>

<script>
import Card from "@/components/PokemonCard";


export default {
  name: "Favorites",
  components: {
    Card
  },
  data() {
    return {
      inputValue: "",
      pokemons : [],
      counterImage: 0,
      isLoadedAllImages: false
    }
  },

  async mounted() {
    if(this.$store.state.favorites.length !== 0) {
      this.pokemons = this.$store.state.favorites
      console.log(this.pokemons)
    }
  },

  methods: {
    incrementCounterImage() {
      this.counterImage ++
      if(this.pokemons.length === this.counterImage) this.isLoadedAllImages = true
    },
    goBack() {
      this.$router.go(-1)
    },

  }
};
</script>

<style scoped>
.v-btn {
  margin:20px;
  color: white;
}

.theme--light.v-btn.v-btn--has-bg {
  background-color: #1976d2;
}

</style>
