"use client"
import React, { useEffect} from "react";
import axios from 'axios';
import md5 from 'md5';
import styles from "../styles/page.module.css";

const baseURL = 'https://gateway.marvel.com/v1/public/characters';

const publicKey = '7a739c443e8db9e71695f3684c46ae18';
const privateKey = '4dad93e2b1cb357bd3af762d053b49fd7f0334ad';
const ts = new Date().getTime();

const hash = md5(ts + privateKey + publicKey);

const App: React.FC = () => {
  useEffect(() => {
    axios.get(`${baseURL}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
      <div>
        Hello World!!
      </div>
  );
};

export default App;
function useClient() {
  throw new Error("Function not implemented.");
}

