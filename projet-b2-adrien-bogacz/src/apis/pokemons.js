import axios from "axios";

const pokemonsInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon',
})

export async function getAllPokemons() {
    try {
        const { data } = await pokemonsInstance.get('/?limit=200&offset=200')
        return data;
    } catch (e) {
        throw new Error('Une erreur est survenue')
    }
}

export async function getPokemon(id) {
    try {
        const { data } = await pokemonsInstance.get(`/${id}`)
        return data;
    } catch (e) {
        throw new Error('Une erreur est survenue')
    }
}