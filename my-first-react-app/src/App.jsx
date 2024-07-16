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

  //an array to keep users picks
  //if a duplicate is found in array, restart game
  //if not duplicate, add to score, random board
}
