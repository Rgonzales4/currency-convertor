import "./App.css";
import CurrencyRow from "./CurrencyRow";
import { useEffect, useState } from "react";
import rawData from "./ExchangeRates.json";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [data, setData] = useState([]);

  let toAmount, fromAmount;
  if (exchangeRate !== undefined) {
    if (amountInFromCurrency) {
      fromAmount = amount;
      toAmount = amount * exchangeRate;
    } else {
      toAmount = amount;
      fromAmount = amount / exchangeRate;
    }
  }

  useEffect(() => {
    let raw = [];
    Object.entries(rawData).map((d) => {
      return (raw[d[1].code] = d[1].rate);
    });

    setCurrencyOptions([...Object.keys(raw)]);
    setFromCurrency(Object.keys(raw)[0]);
    setToCurrency(Object.keys(raw)[1]);
    setExchangeRate(Object.values(raw)[1]);

    setData(raw);
  }, []);

  useEffect(() => {
    if (toCurrency !== undefined && data.length > 0) {
      setExchangeRate(data[toCurrency]);
    }
  }, [data, toCurrency]);

  function handleFromConversion(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToConversion(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <h1> Currency Convertor </h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromConversion}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeAmount={handleToConversion}
        amount={toAmount}
      />
    </>
  );
}

export default App;
