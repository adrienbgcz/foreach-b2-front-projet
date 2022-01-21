<template>
  <div>
    <v-img :src="imageUrl" height="300px" contain/>
    <div>{{pokemonInfos.name}}</div>
    <div>{{pokemonInfos.height}}"</div>
    <div>{{pokemonInfos.weight}} lbs</div>



  </div>
</template>

<script>
import {getPokemon} from "../apis/pokemons"

export default {
  name: "Pokemon",

  data() {
    return {
      pokemonInfos:{},
      imageUrl:""
    }
  },
  async mounted() {
    this.pokemonInfos = await getPokemon(this.$route.params.id)
    this.imageUrl = await this.pokemonInfos.sprites.other.dream_world.front_default
    console.log(this.pokemonInfos)
  }
}
</script>

<style scoped>

</style>