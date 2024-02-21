"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "../styles/page.module.css";
import api from "../lib/api";

interface ResponseData {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const App: React.FC = () => {
  const [characters, setCharacters] = useState<ResponseData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api
      .get("/characters")
      .then((response) => {
        const fetchedCharacters: ResponseData[] = response.data.data.results;
        setCharacters(fetchedCharacters);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleMore = useCallback(async () => {
    try {
      const offset = characters.length;
      const response = await api.get("/characters", {
        params: {
          offset,
        },
      });

      setCharacters([...characters, ...response.data.data.results]);
    } catch (error) {
      console.log(error);
    }
  }, [characters]);

  const handleSearch = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const response = await api.get("/characters", {
          params: {
            nameStartsWith: searchTerm,
          },
        });

        setCharacters(response.data.data.results);
      } catch (error) {
        console.log(error);
      }
    },
    [searchTerm],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <h1>Characters</h1>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Insert name"
            value={searchTerm}
            onChange={handleChange}
          />
          <button className={styles.searchButton} type="submit">
            Search
          </button>
        </form>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {characters.map((character) => (
              <tr key={character.id}>
                <td className={styles.characterNameCell}>{character.name}</td>
                <td className={styles.characterDescriptionCell}>{character.description}</td>
                <td>
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                    className={styles.characterImage}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleMore} className={styles.loadMoreButton}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default App;
function useClient() {
  throw new Error("Function not implemented.");
}
