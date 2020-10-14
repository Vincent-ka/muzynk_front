import axios from "axios";

export function apiHandler() {
  if (!process.env.VUE_APP_BACKEND_URL)
    throw new Error("fournir URL de base pour effectuer appel AJAX");
  const instance = axios.create({
    // axios method
    baseURL: process.env.VUE_APP_BACKEND_URL, // Used to connect to the back API
  });

  return instance;
}
