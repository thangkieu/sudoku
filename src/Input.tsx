import React, { memo, useCallback } from "react";
import InputStyles from "./Input.module.css";

interface Props {
  name: string;
  isError?: boolean;
  row: number;
  col: number;
}

const ALLOWED_KEYS = ["Tab", "Enter", "Backspace"];

export const Input = memo<Props>(({ row, col, name, isError }) => {
  const handleKeyDown = useCallback<
    React.KeyboardEventHandler<HTMLInputElement>
  >(
    (e) => {
      console.log("key", e.key);
      if (!/[1-9]/g.test(e.key) && !ALLOWED_KEYS.includes(e.key)) {
        e.preventDefault();
      }

      let el: HTMLInputElement | null = null;
      switch (e.key) {
        case "ArrowDown":
          el = document.querySelector(`[name="[${row + 1}][${col}]"]`);
          break;
        case "ArrowUp":
          el = document.querySelector(`[name="[${row - 1}][${col}]"]`);
          break;
        case "ArrowLeft":
          el = e.currentTarget.previousElementSibling as HTMLInputElement;
          break;
        case "ArrowRight":
          el = e.currentTarget.nextElementSibling as HTMLInputElement;
          break;
        case "Backspace":
          e.currentTarget.value = "";
          el = e.currentTarget.previousElementSibling as HTMLInputElement;
          break;
      }

      if (el?.tagName !== "INPUT") el = null;

      if (el) focusTo(el, e);
    },
    [col, row]
  );

  const handleInput = useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (!e.currentTarget.value) return;

      const nextEl = e.currentTarget.nextElementSibling as HTMLInputElement;
      focusTo(nextEl, e);
    },
    []
  );

  const handleFocus = useCallback<React.ReactEventHandler<HTMLInputElement>>(
    (e) => {
      e.currentTarget.setSelectionRange(0, e.currentTarget.value.length);
    },
    []
  );

  return (
    <input
      type="tel"
      name={name}
      className={`${InputStyles.input} ${isError ? InputStyles.error : ""}`}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      onFocus={handleFocus}
      autoComplete="off"
    />
  );
});

function focusTo(
  el: HTMLInputElement,
  e: React.KeyboardEvent<HTMLInputElement>
) {
  if (el && el.tagName === "INPUT") {
    el.focus();
  } else {
    e.currentTarget.blur();
  }
}
