<template>
  <div>
    <skeleton-loader v-if="!pokemonName" />

    <v-card v-else class="mx-auto" max-width="200">
      <div class="loaderContainer">
        <v-progress-circular
          v-if="!isLoadedAllImages"
          :size="80"
          color="amber"
          indeterminate
        ></v-progress-circular>

        <v-img
          v-if="isLoadedAllImages"
          :src="image"
          height="150px"
          contain
        ></v-img>
      </div>

      <v-card-title>
        {{ pokemonName }}
      </v-card-title>
      <v-card-actions>
        <router-link :to="{ path: `/pokemon/${pokemonId}` }">
          <v-btn color="orange lighten-2" text>
            {{ $t("more-infos-btn") }}
          </v-btn>
        </router-link>

        <v-btn
          v-if="this.$route.path === '/favorites'"
          color="orange lighten-2"
          text
          @click="deleteFavorite"
        >
          {{ $t("delete-favorites-btn") }}
        </v-btn>

        <v-btn v-else color="orange lighten-2" text @click="addFavorite">
          {{ $t("add-favorites-btn") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { capitalizeFirstLetter } from "../utils/utils";
import SkeletonLoader from "./Skeleton-loader";

export default {
  name: "Card",
  components: {
    SkeletonLoader,
  },
  props: {
    infosUrl: {
      type: String,
    },
    isLoadedAllImages: {
      type: Boolean,
    },
  },
  data() {
    return {
      image: null,
      pokemonName: "",
      pokemonId: 0,
      pokemonInfos: {},
    };
  },
  async mounted() {
    this.pokemonInfos = await axios.get(this.infosUrl);
    await this.getImage();
    this.pokemonName = capitalizeFirstLetter(await this.pokemonInfos.data.name);
    this.pokemonId = await this.pokemonInfos.data.id;
  },
  methods: {
    async getImage() {
      this.image = await this.pokemonInfos.data.sprites.other.dream_world
        .front_default;
      this.$emit("incrementCounterImages");
    },
    addFavorite() {
      this.$store.commit("addFavorite", this.pokemonInfos);
    },
    deleteFavorite() {
      this.$store.commit("deleteFavorite", this.pokemonInfos.data.id);
    },
  },
};
</script>

<style scoped>
.v-card__title {
  padding-bottom: 0;
}

.v-image__image--cover {
  padding: 30px;
}

.v-card {
  margin: 30px;
}

a:-webkit-any-link {
  text-decoration: none;
}

.v-progress-circular {
  margin: 1rem;
}

.loaderContainer {
  height: 150px;
  padding: 10px;
  display: flex;
  justify-content: center;
}
</style>
