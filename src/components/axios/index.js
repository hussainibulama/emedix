import axios from "axios";

const Instance = axios.create({
  baseURL: "http://localhost:3301/", //http://localhost:3301
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
});


export default Instance;

