import Vue from "vue";
import VueRouter from "vue-router";
import Pokemons from "../views/Pokemons.vue";
import Pokemon from "../views/Pokemon.vue";
import Favorites from "@/views/Favorites";
import Names from "./names";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: Names.POKEMONS,
    component: Pokemons,
  },
  {
    path: "/pokemon/:id",
    name: Names.POKEMON,
    component: Pokemon,
  },
  {
    path: "/favorites",
    name: Names.FAVORITES,
    component: Favorites,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
