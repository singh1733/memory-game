import { useEffect, useState } from "react";
import {PokeArray} from "./components/pokeArray.jsx";
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
 
  const [lose, setLose]= useState(false);


  //an array to keep user's picks
  //if a duplicate is found in array, restart game
  //if not duplicate, add to score, random board

  return (
    <PokeArray/>
  );
}
