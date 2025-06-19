import axios from "axios";

const baseURLCORS = import.meta.env.VITE_BACKEND_URL;

if (!baseURLCORS) {
  throw new Error("VITE_BACKEND_URL is not defined in production.");
}


const axiosInstance = axios.create({
    baseURL: baseURLCORS || "http://localhost:3000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }    
});

export default axiosInstance;