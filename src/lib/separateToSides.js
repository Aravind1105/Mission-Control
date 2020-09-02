const calculateIndex = arr => {
  const { length } = arr[arr.length - 1] || [];
  if (!length) {
    return 0;
  }
  return length < 2 ? arr.length - 1 : arr.length;
};

const separateToSides = cells => {
  const cellArr = cells.reduce(
    (prev, curr) => {
      const [key, row, cell] = curr.planogramPosition
        ? [...curr.planogramPosition]
        : ['A', calculateIndex(prev['A'])];
      if (prev[key]) {
        if (!prev[key][row]) {
          prev[key][row] = [];
        }
        if (cell === undefined) {
          prev[key][row].push(curr);
        } else {
          const arrRow = Number(cell)
            ? prev[key][row].map((el, i) => (i ? el || null : el))
            : prev[key][row];
          arrRow[cell] = curr;
          prev[key][row] = [...arrRow];
        }
      }
      return prev;
    },
    { A: [], B: [] },
  );

  return {
    A: cellArr.A.map(el => (el[0] ? el : el.length > 2 ? el : el.concat(null))),
    B: cellArr.B.map(el => (el[0] ? el : el.length > 2 ? el : el.concat(null))),
  };
};

export default separateToSides;
