/* eslint-disable no-const-assign */
import { useState } from "react";
import "./index.scss";

export default function App() {
  let [data, setData] = useState(0)

  function minus() {
    setData((data -= 1))
  }

  function plus() {
    setData((data += 1))
  }

  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{data}</h1>
        <button className="minus" onClick={minus}>
          Минус
        </button>
        <button className="plus" onClick={plus}>
          Плюс+++
        </button>
      </div>
    </div>
  )
}
