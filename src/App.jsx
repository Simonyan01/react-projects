import { useState, useEffect, useCallback } from "react";
import { CurrencyConverter } from "./components/CurrencyConverter";
import styles from "./App.module.css"

const API = "http://localhost:8080/conversion_rates"

const App = () => {
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("AMD");
  const [toCurrency, setToCurrency] = useState("RUB");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((json) => {
        setRates(json);
        console.log(json);
      })
      .catch((err) => {
        console.error("Не удалось получить информацию", err);
      });
  }, []);

  const onChangeFromPrice = useCallback(
    (val) => {
      const price = val / rates[fromCurrency];
      const result = price * rates[toCurrency];
      setToPrice(parseFloat(result.toFixed(2)));
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
    fromPrice,
    onChangeFromPrice,
    toPrice,
    onChangeToPrice,
  ]);

  return (
    <div className={styles.App}>
      <CurrencyConverter
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <CurrencyConverter
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App
