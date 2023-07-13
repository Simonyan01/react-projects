import React, { useState, useEffect, useCallback } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  useEffect(() => {
    fetch("https://api.exchangerate.host/latest")
      .then((res) => res.json())
      .then((json) => {
        setRates(json.rates);
        console.log(json.rates);
      })
      .catch((err) => {
        console.warn(err);
        console.log("Не удалось получить информацию");
      });
  }, []);

  const onChangeFromPrice = useCallback(
    (val) => {
      const price = val / rates[fromCurrency];
      const result = price * rates[toCurrency];
      setToPrice(result.toFixed(2));
      setFromPrice(val);
    },
    [fromCurrency, rates, toCurrency]
  );

  const onChangeToPrice = useCallback(
    (val) => {
      const result = (rates[fromCurrency] / rates[toCurrency]) * val;
      setFromPrice(result.toFixed(2));
      setToPrice(val);
    },
    [fromCurrency, rates, toCurrency]
  );

  useEffect(() => {
    onChangeFromPrice(fromPrice);
    onChangeToPrice(toPrice);
  }, [
    fromCurrency,
    fromPrice,
    onChangeFromPrice,
    toCurrency,
    toPrice,
    onChangeToPrice,
  ]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
