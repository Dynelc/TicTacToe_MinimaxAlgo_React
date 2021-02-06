import React, { useState, useEffect } from "react";

const Board = () => {
  const [position, setposition] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [player, setplayer] = useState("X");

  const [count, setcount] = useState(0);

  const [winner, setWinner] = useState("");

  useEffect(() => {
    if (count > 4) {
      checkResult();
    }
    if (count === 9) {
      if (winner === "") {
        setWinner("Game Draw");
      }
    }
  }, [count]);

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

  const checkResult = () => {
    if (
      (position[0][0] === "X" &&
        position[0][1] === "X" &&
        position[0][2] === "X") ||
      (position[1][0] === "X" &&
        position[1][1] === "X" &&
        position[1][2] === "X") ||
      (position[2][0] === "X" &&
        position[2][1] === "X" &&
        position[2][2] === "X") ||
      (position[0][0] === "X" &&
        position[1][0] === "X" &&
        position[2][0] === "X") ||
      (position[0][1] === "X" &&
        position[1][1] === "X" &&
        position[2][1] === "X") ||
      (position[2][0] === "X" &&
        position[2][1] === "X" &&
        position[2][2] === "X") ||
      (position[0][0] === "X" &&
        position[1][1] === "X" &&
        position[2][2] === "X") ||
      (position[0][2] === "X" &&
        position[1][1] === "X" &&
        position[2][0] === "X")
    ) {
      setWinner("Winner is player X");
    } else if (
      (position[0][0] === "O" &&
        position[0][1] === "O" &&
        position[0][2] === "O") ||
      (position[1][0] === "O" &&
        position[1][1] === "O" &&
        position[1][2] === "O") ||
      (position[2][0] === "O" &&
        position[2][1] === "O" &&
        position[2][2] === "O") ||
      (position[0][0] === "O" &&
        position[1][0] === "O" &&
        position[2][0] === "O") ||
      (position[0][1] === "O" &&
        position[1][1] === "O" &&
        position[2][1] === "O") ||
      (position[2][0] === "O" &&
        position[2][1] === "O" &&
        position[2][2] === "O") ||
      (position[0][0] === "O" &&
        position[1][1] === "O" &&
        position[2][2] === "O") ||
      (position[0][2] === "O" &&
        position[1][1] === "O" &&
        position[2][0] === "O")
    ) {
      setWinner("Winner is player O");
    }
  };

  const playerSelect = (a, b) => {
    if (winner === "") {
      let array = [...position];
      if (position[a][b] === "") {
        array[a][b] = player;
        setposition(array);
      }

      setcount(count + 1);

      if (player === "X") {
        setplayer("O");
      } else {
        setplayer("X");
      }
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
