import axios from "axios";

const Instance = axios.create({
  baseURL: "https://api.e-medix.ng/", //http://localhost:3301
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
});


export default Instance;

