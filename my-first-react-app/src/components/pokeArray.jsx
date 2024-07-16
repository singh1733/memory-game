import { useEffect, useState } from "react";

export function PokeArray() {
  const [pokemonArray, setPokemonArray] = useState([]);

  async function pokemonGetter() {
    let pokemonNumber = Math.floor(Math.random() * 151);
    let pokemonData = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + pokemonNumber
    ).then((response) => response.json());

    return {
      name: pokemonData.name,
      sprite: pokemonData.sprites.front_default,
    };
  }
  let tempPokeArray = [];

  async function pokemonArrayCreator() {
    while (tempPokeArray.length < 10) {
      let pokemonPick = await pokemonGetter();
      if (!tempPokeArray.some((pokemon) => pokemon.name === pokemonPick.name)) {
        tempPokeArray.push(pokemonPick);
      }
    }
    return tempPokeArray;
  }

  useEffect(() => {
    pokemonArrayCreator().then((array) => setPokemonArray(array));
  }, []);
  //dependency should be if lose is chnages to true

  return pokemonArray.map((pokemon) => (
    <div key={pokemon.name} className="card">
      <img src={pokemon.sprite} alt={pokemon.name} />
      <p className="name">{pokemon.name}</p>
    </div>
  ));
}
