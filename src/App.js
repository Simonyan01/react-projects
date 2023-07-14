import React, { useState, useEffect, useCallback } from "react";
import { Block } from "./Block";
import "./index.scss";

const API = "https://api.exchangerate.host/latest";

export default function App() {
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("AMD");
  const [toCurrency, setToCurrency] = useState("RUB");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  useEffect(() => {
    fetch(API)
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
      setToPrice(result.toFixed(1));
      setFromPrice(val);
    },
    [fromCurrency, rates, toCurrency]
  );

  const onChangeToPrice = useCallback(
    (val) => {
      const result = (rates[fromCurrency] / rates[toCurrency]) * val;
      setFromPrice(result.toFixed(0));
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
