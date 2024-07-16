import { useEffect, useState } from "react";
import { PokeArray } from "./components/pokeArray.jsx";
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
  //an array to keep user's picks
  //if a duplicate is found in array, restart game
  //if not duplicate, add to score, random board

  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  return (
    <div className="game">
    <PokeArray
      score={score}
      setScore={setScore}
      maxScore={maxScore}
      setMaxScore={setMaxScore}
    />
    <p>{score}</p>
    <p>{maxScore}</p>

    </div>
  );
}
