import { useEffect, useState } from "react";

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

export default function Grid({
  nRows,
  nCols,
}: {
  nRows: number;
  nCols: number;
}) {
  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < nRows; i++) {
      rows.push(Array.from(Array(nCols), () => 0));
    }
    return rows;
  };

  const [board, setBoard] = useState<number[][]>(generateEmptyGrid);
  const [generation, setGeneration] = useState<number>(0);
  const [isSimulating, setSimulating] = useState<boolean>(false);

  const [intervalID, setIntervalID] = useState<null | number>(null);

  useEffect(() => {
    if (intervalID && !isSimulating) {
      // clearInterval(intervalID);
    } else if (isSimulating && !intervalID) {
      setIntervalID(() => setInterval(updateBoard, 100));
    }
  }, [isSimulating]);

  const seedBoard = () => {
    const rows = [];
    for (let i = 0; i < nRows; i++) {
      rows.push(Array.from(Array(nCols), () => (Math.random() > 0.7 ? 1 : 0)));
    }

    setBoard(rows);
  };

  const updateBoard = () => {
    if (!isSimulating) {
      return;
    }
    const copyGrid = Array.from(board);
    for (let row = 0; row < nRows; row++) {
      for (let col = 0; col < nCols; col++) {
        let count = 0;
        operations.forEach(([x, y]) => {
          const newR = row + x;
          const newC = col + y;
          if (newR >= 0 && newR < nRows && newC >= 0 && newC < nCols) {
            count += copyGrid[newR][newC];
          }
        });
        if (count < 2 || count > 3) {
          // Less than 2 or greater than 3 dies
          copyGrid[row][col] = 0;
        } else if (board[row][col] === 0 && count === 3) {
          // With exactly three it becomes alive
          copyGrid[row][col] = 1;
        }
      }
    }
    setBoard(copyGrid);
    setGeneration((g) => g + 1);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "20px",
        }}
      >
        <button onClick={() => seedBoard()}>Seed Board</button>
        <button
          onClick={() => {
            setSimulating((e) => !e);
          }}
        >
          {"Play"}
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${nCols}, 20px)`,
        }}
      >
        {board.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const copyGrid = Array.from(board);
                copyGrid[i][j] = copyGrid[i][j] ? 0 : 1;
                setBoard(copyGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: board[i][j] ? "green" : undefined,
                border: "solid 1px gray",
              }}
            />
          ))
        )}
      </div>
      <h2>Generation: {generation}</h2>
    </>
  );
}
