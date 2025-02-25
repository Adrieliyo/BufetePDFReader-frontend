import { fetchData } from "./api";

// Esta función se encarga de hacer una petición POST al endpoint /auth/login
// con los datos de email y password. Retorna una promesa con la respuesta del servidor.

export async function login(email: string, password: string) {
  return fetchData("auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
