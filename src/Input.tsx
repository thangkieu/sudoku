import React, { memo, useCallback } from "react";
import InputStyles from "./Input.module.css";

interface Props {
  name: string;
  isError?: boolean;
}

export const Input = memo<Props>(({ name, isError }) => {
  const handleKeyDown = useCallback<
    React.KeyboardEventHandler<HTMLInputElement>
  >((e) => {
    console.log(e.key);
    if (!/[1-9]/g.test(e.key) && e.key !== "Tab" && e.key !== "Enter") {
      e.preventDefault();
    }
  }, []);

  const handleInput = useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      const nextEl = e.currentTarget.nextElementSibling as HTMLInputElement;

      if (nextEl && nextEl.tagName === "INPUT") {
        nextEl.focus();
      } else {
        e.currentTarget.blur();
      }
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
