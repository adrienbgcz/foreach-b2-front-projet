<template>
  <div>
    <v-card class="mx-auto" width="80%">
      <v-btn @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
        {{ $t("return-btn") }}
      </v-btn>
      <v-img :src="imageUrl" height="300px" contain></v-img>

      <v-card-title>
        {{ pokemonName }}
      </v-card-title>

      <v-card-subtitle>
        <div>{{ $t("height") }} : {{ pokemonInfos.height }}"</div>
        <div>{{ $t("weight") }} : {{ pokemonInfos.weight }} lbs</div>
        <div>
          {{ $t("types") }} :
          <ul v-for="type in pokemonTypes" :key="type.id">
            <li>{{ type.type.name }}</li>
          </ul>
        </div>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import { getPokemon } from "../apis/pokemons";
import { capitalizeFirstLetter } from "@/utils/utils";

export default {
  name: "Pokemon",

  data() {
    return {
      pokemonInfos: {},
      pokemonName: "",
      imageUrl: "",
    };
  },
  computed: {
    pokemonTypes: function () {
      return this.pokemonInfos.types;
    },
  },
  async mounted() {
    await this.getCurrentPokemon()
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async getCurrentPokemon() {
      try {
        this.pokemonInfos = await getPokemon(this.$route.params.id);
      } catch(e) {
        console.error(e)
      }
      this.pokemonName = capitalizeFirstLetter(this.pokemonInfos.name);
      this.imageUrl = await this.pokemonInfos.sprites.other.dream_world
          .front_default;
    }
  },
};
</script>

<style scoped>
.v-btn {
  margin: 20px;
  color: white;
}

.theme--light.v-btn.v-btn--has-bg {
  background-color: #1976d2;
}

.v-card {
  margin-top: 50px;
}
</style>
