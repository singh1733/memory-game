import { useEffect } from "react";

export function Win({
  score,
  setScore,
  setGameArray,
  setMaxScore,
  setGameStart,
  gameStart,
}) {
  

  useEffect(() => {
    if (score === 10) {
      setGameStart(!gameStart);
      setMaxScore(10);
      setGameArray([]);
      setScore(0);
      document.querySelector("dialog").showModal();
    }
  }, [score, setScore, setGameArray, setMaxScore, setGameStart, gameStart]);
  return <></>;
}
