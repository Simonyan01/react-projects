<<<<<<< HEAD
import { useState, useEffect, useCallback } from "react"
import { Block } from "./Block"
import "./index.scss"

const API = "http://localhost:5000/conversion_rates"

export default function App() {
  const [rates, setRates] = useState({})
  const [fromCurrency, setFromCurrency] = useState("AMD")
  const [toCurrency, setToCurrency] = useState("RUB")
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(0)
=======
import { useState, useEffect } from "react";
import { Collection } from "./Collection";
import { view } from "./view";
import "./index.scss";

export default function App() {
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const category = categoryId ? `category=${categoryId}` : "";
  const url = `https://64b13c9e062767bc4825e54e.mockapi.io/photo_collections?page=${page}&limit=3&${category}`;
>>>>>>> main

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
<<<<<<< HEAD
      .then((json) => {
        setRates(json)
        console.log(json)
      })
      .catch((err) => {
        console.warn("Не удалось получить информацию", err)
      })
  }, [])

  const onChangeFromPrice = useCallback(
    (val) => {
      const price = val / rates[fromCurrency]
      const result = price * rates[toCurrency]
      setToPrice(result.toFixed(2))
      setFromPrice(val)
    },
    [fromCurrency, rates, toCurrency]
  )

  const onChangeToPrice = useCallback(
    (val) => {
      const result = (rates[fromCurrency] / rates[toCurrency]) * val
      setFromPrice(result.toFixed(0))
      setToPrice(val)
    },
    [fromCurrency, rates, toCurrency]
  )

  useEffect(() => {
    onChangeFromPrice(fromPrice)
    onChangeToPrice(toPrice)
  }, [fromPrice, onChangeFromPrice, toPrice, onChangeToPrice])

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
  )
=======
      .then((data) => setCollections(data))
      .catch((error) => {
        console.error("Ошибка при получении данных", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return (
    <>
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {view.map((obj, i) => (
            <li
              key={obj.name}
              className={categoryId === i ? "active" : ""}
              onClick={() => setCategoryId(i)}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          className="search-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2> Идёт загрузка ... </h2>
        ) : collections.length > 0 ? (
          collections
            .filter((obj) =>
              obj.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, i) => (
              <Collection key={i} name={obj.name} images={obj.photos} />
            ))
        ) : (
          !isLoading && <h2> Не найден </h2>
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : undefined}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </>
  );
>>>>>>> main
}
