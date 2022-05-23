import "./App.css";
import CurrencyRow from "./CurrencyRow";
// import env from "react-dotenv";
import { useEffect, useState } from "react";
import rawData from "./ExchangeRates.json";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState([]);
  const [toCurrency, setToCurrency] = useState([]);
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  function handleFromConversion(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToConversion(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  useEffect(() => {
    // const myHeaders = new Headers();
    // myHeaders.append("apikey", env.EXCHANGE_RATE_TOKEN);

    // const requestOptions = {
    //   method: "GET",
    //   redirect: "follow",
    //   headers: myHeaders,
    // };

    // fetch("https://api.apilayer.com/fixer/latest", requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const firstCurrency = Object.keys(data.rates)[0];
    //     setCurrencyOptions([...Object.keys(data.rates)]);
    //     setFromCurrency(data.base);
    //     setToCurrency(firstCurrency);
    //     setExchangeRate(data.rates[firstCurrency]);
    //   })
    //   .catch((error) => console.log("error", error));

    let data = [];
    Object.entries(rawData).map((d) => {
      return (data[d[1].code] = d[1].rate);
    });

    const firstCurrency = Object.keys(data)[0];
    setCurrencyOptions([...Object.keys(data)]);
    setFromCurrency(firstCurrency);
    setToCurrency(Object.keys(data)[1]);
    setExchangeRate(Object.values(data)[0]);
  }, []);

  return (
    <>
      <h1> Currency Convertor </h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromConversion}
      />
      <div className="equals"> = </div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToConversion}
      />
    </>
  );
}

export default App;
