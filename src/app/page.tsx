"use client";
import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    api
      .get("/characters")
      .then((response) => {
        const fetchedCharacters: ResponseData[] = response.data.data.results;
        setCharacters(fetchedCharacters);
        // console.log("Characters: ", fetchedCharacters);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <h1>Characters</h1>
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
      </div>
    </div>
  );
};

export default App;
function useClient() {
  throw new Error("Function not implemented.");
}
