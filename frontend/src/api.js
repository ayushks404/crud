import axios from "axios";

//creating my axios as api instead of using the URL everywhere
const api = axios.create({

  baseURL: import.meta.env.VITE_API_URL,

  headers: { "Content-Type": "application/json" },

});


//runs before every req , and add the token to the header for backend verification 
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token"); 

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

export default api;
