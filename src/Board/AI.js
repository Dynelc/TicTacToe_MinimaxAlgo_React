import React, { useState, useEffect } from "react";

const Board = () => {
  const [position, setposition] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [count, setcount] = useState(0);

  const scoreList = {
    X: -1,
    O: 1,
    D: 0,
  };

  const [player, setplayer] = useState("X");

  const [winner, setWinner] = useState("");

  const resetBoard = () => {
    let values = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    setposition(values);
    setplayer("X");
    setcount(0);
    setWinner("");
  };

  useEffect(() => {
    checkResult(position);
  }, [position]);

  useEffect(() => {
    if (count < 9) {
      console.log(count);
      if (player === "O") {
        nextMove();
      }
    }
  }, [player]);

  const checkResult = (array) => {
    if (
      (array[0][0] === "X" && array[0][1] === "X" && array[0][2] === "X") ||
      (array[1][0] === "X" && array[1][1] === "X" && array[1][2] === "X") ||
      (array[2][0] === "X" && array[2][1] === "X" && array[2][2] === "X") ||
      (array[0][0] === "X" && array[1][0] === "X" && array[2][0] === "X") ||
      (array[0][1] === "X" && array[1][1] === "X" && array[2][1] === "X") ||
      (array[2][0] === "X" && array[2][1] === "X" && array[2][2] === "X") ||
      (array[0][0] === "X" && array[1][1] === "X" && array[2][2] === "X") ||
      (array[0][2] === "X" && array[1][1] === "X" && array[2][0] === "X")
    ) {
      setWinner("X");
      return "X";
    } else if (
      (array[0][0] === "O" && array[0][1] === "O" && array[0][2] === "O") ||
      (array[1][0] === "O" && array[1][1] === "O" && array[1][2] === "O") ||
      (array[2][0] === "O" && array[2][1] === "O" && array[2][2] === "O") ||
      (array[0][0] === "O" && array[1][0] === "O" && array[2][0] === "O") ||
      (array[0][1] === "O" && array[1][1] === "O" && array[2][1] === "O") ||
      (array[2][0] === "O" && array[2][1] === "O" && array[2][2] === "O") ||
      (array[0][0] === "O" && array[1][1] === "O" && array[2][2] === "O") ||
      (array[0][2] === "O" && array[1][1] === "O" && array[2][0] === "O")
    ) {
      setWinner("O");
      return "O";
    } else {
      let draw = true;

      for (let i = 0; i < position.length; i++) {
        for (let j = 0; j < 3; j++) {
          if (position[i][j] === "") {
            draw = false;
          }
        }
      }

      if (draw === true) {
        setWinner("D");
        return "D";
      }
    }
  };

  const playerSelect = (a, b) => {
    if (winner === "") {
      setcount(count + 1);
      let array = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          array[i][j] = position[i][j];
        }
      }
      if (position[a][b] === "") {
        array[a][b] = player;
        setposition(array);
      }
      //   if (player === "X") {
      //     setplayer("O");
      //   } else {
      //     setplayer("X");
      //   }
      setplayer("O");
    }
  };
  const nextMove = () => {
    setcount(count + 1);
    let bestSore = -Infinity;
    let values = [...position];
    let a, b;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (values[i][j] === "") {
          values[i][j] = "O";
          // console.log(i, j);
          // console.log(values[i][j]);
          // console.log(values);
          let score = minimax(values, 0, false);
          values[i][j] = "";
          if (score > bestSore) {
            bestSore = score;
            a = i;
            b = j;
          }
        }
      }
    }
    values[a][b] = "O";
    setposition(values);
    setplayer("X");
  };

  const minimax = (array, depth, decision) => {
    let result = checkResult(array);
    setWinner("");
    if (result != null) {
      return scoreList[result];
    }

    if (decision) {
      let bestSore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (array[i][j] === "") {
            array[i][j] = "O";
            let score = minimax(array, depth + 1, false);
            array[i][j] = "";
            if (score !== null) {
              bestSore = Math.max(bestSore, score);
            }
          }
        }
      }
      return bestSore;
    } else {
      let bestSore = +Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (array[i][j] === "") {
            array[i][j] = "X";
            let score = minimax(array, depth + 1, true);
            array[i][j] = "";
            if (score !== null) {
              bestSore = Math.min(bestSore, score);
            }
          }
        }
      }
      return bestSore;
    }
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 10,
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => playerSelect(0, 0)}
            style={{
              height: 100,
              width: 100,
              backgroundColor: "aqua",
              margin: 10,
              fontSize: 30,
            }}
          >
            {position[0][0]}
          </button>
          <button
            onClick={() => playerSelect(0, 1)}
            style={{
              height: 100,
              width: 100,
              backgroundColor: "aqua",
              margin: 10,
              fontSize: 30,
            }}
          >
            {position[0][1]}
          </button>
          <button
            onClick={() => playerSelect(0, 2)}
            style={{
              height: 100,
              width: 100,
              backgroundColor: "aqua",
              margin: 10,
              fontSize: 30,
            }}
          >
            {position[0][2]}
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 10,
            justifyContent: "center",
            fontSize: 30,
          }}
        >
          <button
            onClick={() => playerSelect(1, 0)}
            style={{
              height: 100,
              width: 100,
              backgroundColor: "aqua",
              margin: 10,
              fontSize: 30,
            }}
          >
            {position[1][0]}
          </button>
          <button
            onClick={() => playerSelect(1, 1)}
            style={{
              height: 100,
              width: 100,
              backgroundColor: "aqua",
              margin: 10,
              fontSize: 30,
            }}
          >
            {position[1][1]}
          </button>
          <button
            onClick={() => playerSelect(1, 2)}
            style={{
              height: 100,
              width: 100,
              backgroundColor: "aqua",
              margin: 10,
              fontSize: 30,
            }}
          >
            {position[1][2]}
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 10,
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => playerSelect(2, 0)}
            style={{
              height: 100,
              width: 100,
              backgroundColor: "aqua",
              margin: 10,
              fontSize: 30,
            }}
          >
            {position[2][0]}
          </button>
          <button
            onClick={() => playerSelect(2, 1)}
            style={{
              height: 100,
              width: 100,
              backgroundColor: "aqua",
              margin: 10,
              fontSize: 30,
            }}
          >
            {position[2][1]}
          </button>
          <button
            onClick={() => playerSelect(2, 2)}
            style={{
              height: 100,
              width: 100,
              backgroundColor: "aqua",
              margin: 10,
              fontSize: 30,
            }}
          >
            {position[2][2]}
          </button>
        </div>
      </div>
      <h2> {winner}</h2>
      <button
        onClick={() => resetBoard()}
        style={{
          height: 50,
          width: 150,
          borderRadius: 10,
          fontSize: 30,
          color: "white",
          backgroundColor: "green",
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Board;
