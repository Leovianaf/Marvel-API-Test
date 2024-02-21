"use client"
import React, { use, useEffect, useState} from "react";
import styles from "../styles/page.module.css";
import api from "../lib/api";

const baseURL = 'https://gateway.marvel.com/v1/public/characters';

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
      .get('/characters')
      .then(response => {
      const fetchedCharacters: ResponseData[] = response.data.data.results;
      setCharacters(fetchedCharacters);
      console.log("Characters: ", fetchedCharacters); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
      <div>
        <h1>Characters</h1>
        {characters.map((character) => {
          return (
            <div key={character.id} className={styles.character}>
              <h2>{character.name}</h2>
              <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
              <p>{character.description}</p>
            </div>
          );
        })}
      </div>
  );
};

export default App;
function useClient() {
  throw new Error("Function not implemented.");
}

