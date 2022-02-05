<template>
  <div>

    <skeleton-loader v-if="!pokemonName"/>

    <v-card v-else
        class="mx-auto"
        max-width="200"
    >
      <div class="loaderContainer" >
        <v-progress-circular v-if="!isLoadedAllImages"
            :size="80"
            color="amber"
            indeterminate
        ></v-progress-circular>


      <v-img v-if="isLoadedAllImages"
          :src=image
          height="150px"
          contain
      ></v-img>
      </div>

      <v-card-title>
        {{ pokemonName }}
      </v-card-title>
      <router-link :to="{ path: `/pokemon/${pokemonId}` }">
      <v-card-actions>

        <v-btn color="orange lighten-2" text >
          {{ $t("more-infos-btn") }}
        </v-btn>

        <v-btn color="orange lighten-2" text >
          {{ $t("add-favorites-btn") }}
        </v-btn>

      </v-card-actions>
      </router-link>
    </v-card>



  </div>
</template>

<script>
import axios from "axios";
import {capitalizeFirstLetter} from "../utils/utils"
import SkeletonLoader from "./Skeleton-loader"

export default {
  name: "Card",
  components: {
    SkeletonLoader
  },
  props: {
    infosUrl: {
      type: String
    },
    isLoadedAllImages: {
      type: Boolean
    }
  },
  data () {
    return {
      image: null,
      pokemonName: "",
      pokemonId: 0,
      pokemonInfos: {}
    }
  },
  watch: {
    isLoadedAllImages()  {
      console.log(this.isLoadedAllImages)
    }
  },
  async mounted() {
    this.pokemonInfos = await axios.get(this.infosUrl)
    await this.getImage()
    this.pokemonName = capitalizeFirstLetter(await this.pokemonInfos.data.name)
    this.pokemonId = await this.pokemonInfos.data.id
  },
  methods: {
    async getImage() {

      this.image = await this.pokemonInfos.data.sprites.other.dream_world.front_default
      this.$emit('incrementCounterImages')
    }
  }
}
</script>

<style scoped>
.v-card__title {
  padding-bottom: 0;
}

.v-image__image--cover {
  padding: 30px
}

.v-card {
  margin: 30px;
}

a:-webkit-any-link {
  text-decoration:none;
}

.v-progress-circular {
  margin: 1rem;
}

.loaderContainer {
  height: 150px;
  padding: 10px;
  display:flex;
  justify-content: center;
}

</style>