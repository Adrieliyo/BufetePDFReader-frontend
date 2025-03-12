import { fetchData } from "./api";

// Esta función se encarga de hacer una petición GET al endpoint auth/verify
export async function verifyUser(token: string) {
    return fetchData(`auth/verify?token=${encodeURIComponent(token)}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json'
      },

    });
}