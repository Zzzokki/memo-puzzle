"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Board } from "./Board";

const images = {
  1: "https://randomwordgenerator.com/img/picture-generator/57e5d6464956a914f1dc8460962e33791c3ad6e04e50744172297ed29348c6_640.jpg",
  2: "https://randomwordgenerator.com/img/picture-generator/51e6dd444c57b10ff3d8992cc12c30771037dbf852547940772c7dd49f4f_640.jpg",
  3: "https://randomwordgenerator.com/img/picture-generator/fantasy-2925250_640.jpg",
  4: "https://randomwordgenerator.com/img/picture-generator/53e0d2474f56ac14f1dc8460962e33791c3ad6e04e50744172277fd7964ec6_640.jpg",
  5: "https://randomwordgenerator.com/img/picture-generator/54e3dd404c5aaf14f1dc8460962e33791c3ad6e04e5074417c2f7dd6954cc1_640.jpg",
  6: "https://randomwordgenerator.com/img/picture-generator/53e0d6424355ab14f1dc8460962e33791c3ad6e04e507440762d7fd59449c3_640.jpg",
  7: "https://randomwordgenerator.com/img/picture-generator/5fe3d7404e54b10ff3d8992cc12c30771037dbf85254784b72267cd1914c_640.jpg",
  8: "https://randomwordgenerator.com/img/picture-generator/52e3d6464351a514f1dc8460962e33791c3ad6e04e507440762a7cd69148c6_640.jpg",
};

const generateBoard = () => {
  const values = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

  const board = [];

  for (let i = 0; i < 16; i++) {
    const value = values.splice(
      Math.floor(Math.random() * (values.length - 1)),
      1
    )[0];

    board.push({
      id: i,
      value,
      src: images[value],
    });
  }

  return board;
};

const GameContext = createContext();

export const Game = () => {
  const [data, setData] = useState(() => generateBoard());
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (solved.length === 16) {
      alert("You win!");
    }
  }, [solved.length]);

  useEffect(() => {
    if (flipped.length === 2) {
      setIsRunning(false);

      setTimeout(() => {
        const [first, second] = flipped;

        if (data[first].value === data[second].value) {
          setSolved((solved) => [...solved, first, second]);
        }

        setFlipped([]);
        setIsRunning(true);
      }, 1000);
    }
  }, [flipped]);

  return (
    <GameContext.Provider
      value={{
        data,
        setData,
        flipped,
        setFlipped,
        solved,
        setSolved,
        isRunning,
        setIsRunning,
      }}
    >
      <div className="container">
        <Board />
      </div>
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
