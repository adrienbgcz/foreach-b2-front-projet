import axios from "axios";
import ApisConstants from "./apis-constants";

const pokemonsInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

export async function getAllPokemons() {
  try {
    const { data } = await pokemonsInstance.get("/?limit=200&offset=100");
    console.log(data)
    return data;
  } catch (e) {
    throw new Error(ApisConstants.ERROR);
  }
}

export async function getPokemon(id) {
  try {
    const { data } = await pokemonsInstance.get(`/${id}`);
    return data;
  } catch (e) {
    throw new Error(ApisConstants.ERROR);
  }
}
