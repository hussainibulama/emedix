import axios from "axios";

const Instance = axios.create({
  baseURL: "https://api.e-medix.ng/", //http://localhost:3301
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods":" GET, PUT, POST, DELETE, OPTIONS"
  },

});


export default Instance;

