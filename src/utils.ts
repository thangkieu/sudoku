function notInRow(arr: number[][], rowIndex: number) {
  const st = new Set();

  const rowData = arr[rowIndex];
  for (let colIndex = 0; colIndex < rowData.length; colIndex++) {
    const no = rowData[colIndex];

    if (st.has(no) || no === 0) return [rowIndex, colIndex];
    st.add(no);
  }

  return true;
}

function notInCol(arr: number[][], colIndex: number) {
  const st = new Set();

  for (let rowIndex = 0; rowIndex < arr.length; rowIndex++) {
    const no = arr[rowIndex][colIndex];

    if (st.has(no) || no === 0) return [rowIndex, colIndex];
    st.add(no);
  }

  return true;
}

function not_in_cell(
  arr: number[][],
  startRowIndex: number,
  startColIndex: number
) {
  const st = new Set();

  for (let rowIndex = startRowIndex; rowIndex < startRowIndex + 3; rowIndex++) {
    for (
      let colIndex = startColIndex;
      colIndex < startColIndex + 3;
      colIndex++
    ) {
      const no = arr[rowIndex][colIndex];

      if (st.has(no) || no === 0) return [rowIndex, colIndex];
      st.add(no);
    }
  }

  return true;
}

export function validateSudoku(board: number[][]): number[][] {
  const errorCells = [];

  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    const isValidRow = notInRow(board, rowIndex);
    const isValidCol = notInCol(board, rowIndex);

    if (Array.isArray(isValidRow)) errorCells.push(isValidRow);
    if (Array.isArray(isValidCol)) errorCells.push(isValidCol);
  }

  for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
    for (let colIndex = 0; colIndex < 3; colIndex++) {
      const isValidCell = not_in_cell(board, rowIndex * 3, colIndex * 3);
      if (Array.isArray(isValidCell)) errorCells.push(isValidCell);
    }
  }

  return errorCells;
}

export function getRootPath(url: string) {
  return `${process.env.PUBLIC_URL}${url}`;
}
