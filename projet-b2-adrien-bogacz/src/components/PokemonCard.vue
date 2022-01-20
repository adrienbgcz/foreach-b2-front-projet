<template>
  <div>
    <v-card
        class="mx-auto"
        max-width="200"
    >
      <v-img
          :src=imageUrl
          height="150px"
      ></v-img>

      <v-card-title>
        {{ pokemonName }}
      </v-card-title>

      <v-card-actions>
        <v-btn
            color="orange lighten-2"
            text
        >
          Explore
        </v-btn>
      </v-card-actions>


    </v-card>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Card",
  props: {
    infosUrl: {
      type: String
    }
  },
  data () {
    return {
      imageUrl: "",
      pokemonName: ""
    }
  },
  async mounted() {
    const pokemonInfos = await axios.get(this.infosUrl)
    console.log(pokemonInfos)
    this.imageUrl = await pokemonInfos.data.sprites.other.dream_world.front_default
    this.pokemonName = await pokemonInfos.data.name
  }
}
</script>

<style scoped>
.v-card__title {
  padding-bottom: 0;
}

.v-image__image--cover {
  background-size: contain;
}

.v-card {
  margin: 30px
}

</style>