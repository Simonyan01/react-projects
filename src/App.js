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

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
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
}
