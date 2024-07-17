import { useEffect, useState } from "react";
import { Win } from "./win.jsx";


export function PokeArray({ score, setScore, maxScore, setMaxScore }) {
  const [pokemonArray, setPokemonArray] = useState([]);

  async function pokemonGetter() {
    try {
      //+1 to avoid 0
      let pokemonNumber = Math.floor(Math.random() * 150) + 1;
      let response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + pokemonNumber
      );
      if (!response.ok) throw new Error("Network response was not ok");
      let pokemonData = await response.json();
      return {
        name: pokemonData.name,
        sprite: pokemonData.sprites.front_default,
      };
    } catch (error) {
      console.error("Failed to fetch Pokémon:", error);
      return null;
    }
  }

  async function pokemonArrayCreator() {
    let tempPokeArray = [];
    while (tempPokeArray.length < 10) {
      let pokemonPick = await pokemonGetter();
      if (!tempPokeArray.some((pokemon) => pokemon.name === pokemonPick.name)) {
        tempPokeArray.push(pokemonPick);
      }
    }
    return tempPokeArray;
  }

  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    pokemonArrayCreator().then((array) => setPokemonArray(array));

    return setPokemonArray([]);
  }, [gameStart]);

  const [gameArray, setGameArray] = useState([]);

  function cardClick(name) {
    let temp = [...gameArray];
    if (!temp.includes(name)) {
      temp.push(name);
      setGameArray(temp);
      setScore(score + 1);
      currentGameRandomizer();
    } else {
      setGameArray([]);
      setGameStart(!gameStart);
      setMaxScore(Math.max(score, maxScore));
      setScore(0);
    }
  }

  function currentGameRandomizer() {
    let randomPokeArray = [];
    const arrayIndices = Array.from({ length: 10 }, (_, i) => i);
    for (let i = 9; i >= 0; i--) {
      let randomIndex = Math.ceil(Math.random() * i);
      randomPokeArray.push(pokemonArray[arrayIndices[randomIndex]]);
      arrayIndices.splice(randomIndex, 1);
    }
    setPokemonArray(randomPokeArray);
  }

  return (
    <>
      <Win score={score} setScore={setScore} setGameArray={setGameArray} setMaxScore={setMaxScore} setGameStart={setGameStart} gameStart={gameStart}/>
      {pokemonArray.map((pokemon) => (
        <div
          key={pokemon.name}
          className="card"
          onClick={() => cardClick(pokemon.name)}
        >
          <img src={pokemon.sprite} alt={pokemon.name} />
          <p className="name">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </p>
        </div>
      ))}
    </>
  );
}
