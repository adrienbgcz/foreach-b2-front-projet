import Vue from "vue";
import VueRouter from "vue-router";
import Pokemons from "../views/Pokemons.vue";
import Pokemon from "../views/Pokemon.vue";
import Favorites from "@/views/Favorites";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Pokemons",
    component: Pokemons
  },
  {
    path: "/pokemon/:id",
    name: "Pokemon",
    component: Pokemon
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
