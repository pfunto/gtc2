import React, { KeyboardEvent, ChangeEvent, useCallback } from 'react';

interface Props {
  max?: number;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onValueChange: (value: number) => void;
}

const VALID_FIRST = /^[1-9]{1}$/;
const VALID_NEXT = /^[0-9]{1}$/;

const CurrencyInput = ({ max, value, onChange, onValueChange }: Props) => {
  const valueAbsTrunc = Math.trunc(Math.abs(value));
  if (
    value !== valueAbsTrunc ||
    !Number.isFinite(value) ||
    Number.isNaN(value)
  ) {
    throw new Error(`invalid value property`);
  }
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>): void => {
      const { key } = e;

      if (
        (value === 0 && !VALID_FIRST.test(key)) ||
        (value !== 0 && !VALID_NEXT.test(key) && key !== 'Backspace')
      ) {
        return;
      }
      const valueString = value.toString();
      let nextValue: number;
      if (key !== 'Backspace') {
        const nextValueString: string =
          value === 0 ? key : `${valueString}${key}`;
        nextValue = Number.parseInt(nextValueString, 10);
      } else {
        const nextValueString = valueString.slice(0, -1);
        nextValue =
          nextValueString === '' ? 0 : Number.parseInt(nextValueString, 10);
      }
      if (max) {
        if (nextValue > max) {
          return;
        }
      }
      onValueChange(nextValue);
    },
    [max, onValueChange, value]
  );
  const handleChange = useCallback(() => {
    // DUMMY TO AVOID REACT WARNING
  }, []);
  const valueDisplay = (value / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const valueString = value.toString();

  return (
    <input
      inputMode="numeric"
      onChange={onChange}
      onKeyDown={handleKeyDown}
      value={valueString}
    />
  );
};

export default CurrencyInput;
