import React, { useState } from 'react'

export const FetchAPI = () => {
    const [categoriId, ] = useState(0);
    const [, setCollections] = useState([]);
    const [, setIsLoading] = useState(true);
    const [page, ] = useState(1);



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
    return (
        <div>fetchAPI</div>
    )
}

