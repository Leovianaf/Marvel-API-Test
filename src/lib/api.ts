import axios from "axios";
import md5 from "md5";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

const ts = new Date().getTime();
let hash;

if (!publicKey || !privateKey) {
  console.error("Chaves não definidas.");
} else {
  hash = md5(ts + privateKey + publicKey);
}

const api = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
  params: {
    ts,
    apikey: publicKey,
    hash,
  },
});

export default api;
