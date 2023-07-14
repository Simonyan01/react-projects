import React, { useState, useEffect } from "react";
import { Collection } from "./Collection";
import "./index.scss";
import { view } from "./view";

export default function App() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [categoriId, setCategoriId] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const category = categoriId ? `category=${categoriId}` : "";
    
    fetch(
      `https://64b13c9e062767bc4825e54e.mockapi.io/photos?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        console.log("Ошибка при получении данных");
      })
      .finally(() => setIsLoading(false));
  }, [categoriId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {view.map((obj, i) => (
            <li
              onClick={() => setCategoriId(i)}
              className={categoriId === i ? "active" : ""}
              key={obj.name}
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
          <h2>Идёт загрузка ...</h2>
        ) : (
          collections.map((obj, index) => (
            <Collection key={index} name={obj.name} images={obj.photos} />
          ))
        )}
      </div>
      <ul className="pagination">
        {[
          ...Array(5).map((_, i) => (
            <li
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? "active" : ""}
            >
              {i + 1}
            </li>
          )),
        ]}
      </ul>
    </div>
  );
}
