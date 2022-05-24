import React from "react";

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;

  return (
    <>
      <div>
        <input
          type="number"
          className="numberInput"
          value={amount}
          onChange={onChangeAmount}
        />
        <select
          value={selectedCurrency}
          onChange={onChangeCurrency}
          multiple={false}
        >
          {currencyOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
