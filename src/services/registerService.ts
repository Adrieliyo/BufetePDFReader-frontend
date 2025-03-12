import { fetchData } from "./api";

// Esta función se encarga de hacer una petición POST al endpoint auth/register
export async function register(username: string, names: string, lastnames:string, email: string, password: string) {
    return fetchData("auth/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, names, lastnames, email, password }),
    });
}