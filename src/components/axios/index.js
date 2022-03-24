import axios from "axios";

const Instance = axios.create({
  baseURL: "http://13.40.222.137:3301/", //http://localhost:3301
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
});


export default Instance;

