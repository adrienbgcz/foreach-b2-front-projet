<template>
  <div>
    <p>{{ pokemonInfos }}</p>
  </div>
</template>

<script>
import {getPokemon} from "../apis/pokemons"

export default {
  name: "Pokemon",

  data() {
    return {
      pokemonInfos:{}
    }
  },
  async mounted() {
    this.pokemonInfos = await getPokemon(this.$route.params.id)
    console.log(this.pokemonInfos)
  }
}
</script>

<style scoped>

</style>