import React, { useCallback, useRef, useState } from "react";
import AppStyles from "./App.module.css";
import { Input } from "./Input";
import { getRootPath, validateSudoku } from "./utils";

function App() {
  const formRef = useRef<HTMLFormElement>();
  const [errorCells, setErrorCells] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      const formData = new FormData(formRef.current);

      const soduku: number[][] = Array.from({ length: 9 }).map(() => []);

      for (const key of formData.keys()) {
        const matches = /\[(\d)\]\[(\d)\]/g.exec(key);
        if (!matches) continue;

        const row = parseInt(matches[1], 10);
        const col = parseInt(matches[2], 10);
        const val = formData.get(key);

        if (typeof val !== "string" && typeof val !== "number") continue;

        soduku[row][col] = val ? parseInt(val, 10) : 0;
      }

      const errorCells = validateSudoku(soduku);
      if (Array.isArray(errorCells) && errorCells.length > 0) {
        setErrorCells(
          errorCells.reduce((acc, cell) => {
            return {
              ...acc,
              [cell.join("")]: true,
            };
          }, {})
        );
      } else {
        setIsValid(true);
        setErrorCells({});
      }
    },
    []
  );

  const handleClear = useCallback(() => {
    formRef.current?.reset();
    setErrorCells({});
    setIsValid(false);
  }, []);

  return (
    <div>
      <main>
        <form
          ref={formRef as any}
          className={AppStyles.sudokuBoxContainer}
          onSubmit={handleSubmit}
        >
          <h2 className={AppStyles.pageTitle}>
            <img
              src={getRootPath("/logo192.png")}
              alt="Logo"
              width="48"
              style={{ verticalAlign: "middle" }}
            />{" "}
            Sudoku Validator
          </h2>
          <div
            className={`${AppStyles.sudokuBox} ${
              isValid ? AppStyles.validSudoku : ""
            }`}
          >
            {Array.from({ length: 9 }).map((_, row) => (
              <React.Fragment key={row}>
                {Array.from({ length: 9 }).map((_, col) => (
                  <Input
                    key={`[${row}][${col}]`}
                    name={`[${row}][${col}]`}
                    isError={Boolean(errorCells[`${row}${col}`])}
                    row={row}
                    col={col}
                  />
                ))}
              </React.Fragment>
            ))}
            <span className={AppStyles.separator}></span>
          </div>
          <div className={AppStyles.actions}>
            <button
              type="button"
              className={`${AppStyles.button} ${AppStyles.buttonDanger}`}
              onClick={handleClear}
            >
              Clear
            </button>
            <button className={AppStyles.button}>Validate</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
