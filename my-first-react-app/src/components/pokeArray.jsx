import { useEffect, useState } from "react";

export function PokeArray({ score, setScore, maxScore, setMaxScore }) {
  const [pokemonArray, setPokemonArray] = useState([]);

  async function pokemonGetter() {
    //+1 to avoid 0
    let pokemonNumber = Math.floor(Math.random() * 150) + 1;
    let pokemonData = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + pokemonNumber
    ).then((response) => response.json());

    return {
      name: pokemonData.name,
      sprite: pokemonData.sprites.front_default,
    };
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

  const [loseToggle, setLoseToggle] = useState(false);

  useEffect(() => {
    pokemonArrayCreator().then((array) => setPokemonArray(array));
  }, [loseToggle]);

  const [gameArray, setGameArray] = useState([]);

  function cardClick(name) {
    let temp = [...gameArray];
    if (!temp.includes(name)) {
      temp.push(name);
      setGameArray(temp);
      setScore(score + 1);
      currentGameRandomizer();
      if (score === 10) {
        console.log("you win");
        setLoseToggle(!loseToggle);
        setMaxScore(10);
        setGameArray([]);
        setScore(0);
      }
    } else {
      setGameArray([]);
      setLoseToggle(!loseToggle);
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

  return pokemonArray.map((pokemon) => (
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
  ));
}
