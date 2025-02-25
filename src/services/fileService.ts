import { fetchData } from "./api";

// Esta función se encarga de subir un archivo al servidor y retorna la respuesta del servidor.

export async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
  
    return fetchData("upload", { method: "POST", body: formData });
  }
  