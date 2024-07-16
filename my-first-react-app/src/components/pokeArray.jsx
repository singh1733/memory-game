import { useEffect, useState } from "react";

export function PokeArray({score, setScore, maxScore, setMaxScore}) {
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

  const [loseToggle, setLoseToggle] = useState(false);

  useEffect(() => {
    pokemonArrayCreator().then((array) => setPokemonArray(array));
  }, [loseToggle]);

  const [gameArray, setGameArray] = useState([]);

  function cardClick(name) {
    let temp = gameArray;
    if (!temp.includes(name)) {
      temp.push(name);
      setGameArray(temp);
      setScore(score + 1);
    } else {
      console.log("bye");
      setLoseToggle(!loseToggle);
      setMaxScore(Math.max(score, maxScore));
      setScore(0);

    }
  }

  return pokemonArray.map((pokemon) => (
    <div
      key={pokemon.name}
      className="card"
      onClick={() => cardClick(pokemon.name)}
    >
      <img src={pokemon.sprite} alt={pokemon.name} />
      <p className="name">{pokemon.name}</p>
    </div>
  ));
}
