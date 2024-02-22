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
  const [showWithDescription, setShowWithDescription] = useState(false);
  const [showWithImage, setShowWithImage] = useState(false);

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
        let filteredCharacters = response.data.data.results;
        if (showWithDescription) {
          filteredCharacters = filteredCharacters.filter((character: ResponseData) => character.description !== "");
        }
        if (showWithImage) {
          filteredCharacters = filteredCharacters.filter((character: ResponseData) => {
            return !character.thumbnail.path.includes("image_not_available");
          });
        }

        setCharacters(filteredCharacters);
      } catch (error) {
        console.log(error);
      }
    },
    [searchTerm, showWithDescription, showWithImage],
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
        <div className={styles.filterContainer}>
          <h2>Choose any filter:</h2>
          <label>
            <input type="checkbox" checked={showWithImage} onChange={(e) => setShowWithImage(e.target.checked)} />
            Show only characters with image
          </label>
          <label>
            <input
              type="checkbox"
              checked={showWithDescription}
              onChange={(e) => setShowWithDescription(e.target.checked)}
            />
            Show only characters with description
          </label>
        </div>
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
