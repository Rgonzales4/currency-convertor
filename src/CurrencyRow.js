import React from "react";

export default function CurrencyRow(props) {
  const { currencyOptions } = props;

  console.log(currencyOptions);
  return (
    <>
      <div>
        <input type="number" className="numberInput"></input>
        <select>
          {currencyOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
          <option value="Hi">Hi</option>
        </select>
      </div>
    </>
  );
}
