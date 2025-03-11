import { fetchData } from "./api";

// Esta función se encarga de hacer una petición POST al endpoint /auth/login
// con los datos del nombre de usuario o email y password. Retorna una promesa con la respuesta del servidor.

export async function login(email_or_username: string, password: string) {
  return fetchData("auth/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email_or_username, password }),
  });
}