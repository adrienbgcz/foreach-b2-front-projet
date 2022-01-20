import axios from "axios";

const pokemonsInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon?limit=200&offset=200',
})

export async function getAllPokemons() {
    try {
        const { data } = await pokemonsInstance.get('/')
        return data;
    } catch (e) {
        throw new Error('Une erreur est survenue')
    }
}