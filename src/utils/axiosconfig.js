import axios from 'axios';

console.log("API Base URL:", process.env.REACT_APP_API_URL);

const axiosInstance = axios.create({
  baseURL: "http://149.165.154.213:5877/api" || "http://127.0.0.1:5000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
  },
});
export default axiosInstance; 