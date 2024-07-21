import { useState } from "react";

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

  const [board, setBoard] = useState(generateEmptyGrid);
  console.log(board);

  return <div>Grid</div>;
}
