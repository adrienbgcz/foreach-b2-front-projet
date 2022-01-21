<template>
  <div>
    <input-filter @input="getValue" />
    <v-row>
      <v-col cols="3" v-for="pokemon in filteredPokemons" :key="pokemon.name" >
        <card :infos-url="pokemon.url"/>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import Card from "@/components/PokemonCard";
import InputFilter from "@/components/inputFilter"
import {getAllPokemons} from "@/apis/pokemons";


export default {
  name: "Home",
  components: {
    Card,
    InputFilter
  },
  data() {
    return {
      inputValue: "",
      pokemons : []

    }
  },
  computed : {
    filteredPokemons : function(){
      if(this.$store.state.pokemons.length > 0) return this.$store.state.pokemons.filter((pokemon) => pokemon.name.includes(this.inputValue))
      return this.pokemons.results?.filter((pokemon) => pokemon.name.includes(this.inputValue))
    }
  },
  async mounted() {
    await this.filteredData()
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
        console.log(this.pokemons)
        return pokemons
      } catch(e) {
        console.error(e)
      }

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

v-text-field {
  width: 400px
}
</style>
