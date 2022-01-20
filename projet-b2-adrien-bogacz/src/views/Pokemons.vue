<template>
  <div class="allCards">
      <card v-for="pokemon in pokemons.results" :key="pokemon.id" :infos-url="pokemon.url"/>
  </div>

</template>

<script>
import Card from "@/components/PokemonCard";
import {getAllPokemons} from "../apis/pokemons"

export default {
  name: "Home",
  components: {
    Card
  },
  data() {
    return {
      pokemons: [],
    }
  },
  async mounted() {
    try {
      this.pokemons = await getAllPokemons()
      console.log(this.pokemons.results[0].name)
    } catch(e) {
      console.error(e)
    }
  }
};
</script>

<style scoped>
.allCards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
