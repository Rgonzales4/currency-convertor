import "./App.css";
import CurrencyRow from "./CurrencyRow";
import env from "react-dotenv";
import { useEffect, useState } from "react";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  console.log(currencyOptions);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("apikey", env.EXCHANGE_RATE_TOKEN);

    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch("https://api.apilayer.com/fixer/latest", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setCurrencyOptions([...Object.keys(data.rates)]);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <h1> Currency Convertor </h1>
      <CurrencyRow currencyOptions={currencyOptions} />
      <div className="equals"> = </div>
      <CurrencyRow currencyOptions={currencyOptions} />
    </>
  );
}

export default App;
