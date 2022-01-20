import Vue from "vue";
import VueRouter from "vue-router";
import Pokemons from "../views/Pokemons.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Pokemons",
    component: Pokemons,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
