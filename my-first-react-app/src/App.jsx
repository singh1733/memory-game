import { useEffect, useState } from "react";
import "./App.css";

function NewGame({ lose, score, bestScore }) {
  useEffect(() => {
    //code to start new game
  }, [lose]);
}

function RandomBoard({ score }) {
  useEffect(() => {
    //code to random board
  }, [score]);
}

export default function App() {
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

  const pokemon = [];

  for (let i = 0; i < 10; i++) {
    let pokemonPick;
    while (pokemon.includes(pokemonPick)) {
      pokemonPick = pokemonGetter();
    }
    pokemon[i] = pokemonPick;
  }
  console.log(pokemon);

  //an array to keep user's picks
  //if a duplicate is found in array, restart game
  //if not duplicate, add to score, random board
}
