import { useState } from "react";
import { PokeArray } from "./components/pokeArray.jsx";
import "./App.css";

export default function App() {
  //an array to keep user's picks
  //if a duplicate is found in array, restart game
  //if not duplicate, add to score, random board

  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  return (
    <div className="game">
      <p className="title">Pokemon Memory Game</p>
      <p className="description">
        Get points by clicking on an image but don't click on the same one twice!
      </p>
      <div className="score">
        <p>Score: {score}</p>
        <p>Max Score: {maxScore}</p>
      </div>
      <div className="gameBoard">
        <PokeArray
          score={score}
          setScore={setScore}
          maxScore={maxScore}
          setMaxScore={setMaxScore}
        />
      </div>
    </div>
  );
}
