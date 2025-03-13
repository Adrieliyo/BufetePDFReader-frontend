// export async function fetchData(endpoint: string, options?: RequestInit) {
//   // const defaultOptions: RequestInit = {
//   //   headers: {
//   //       'Content-Type': 'application/json'
//   //   },
//   //   ...options
//   // };
//   // const response = await fetch(`http://localhost:8000/${endpoint}`, defaultOptions);
    

//   const response = await fetch(`http://localhost:8000/${endpoint}`, options);
  
//   // Verificar si la respuesta fue exitosa
//   if (!response.ok) {
//       // Intentar obtener detalles del error si están disponibles
//       const errorData = await response.json().catch(() => null);
//       const errorMessage = errorData?.detail || `Error ${response.status}: ${response.statusText}`;
//       throw new Error(errorMessage);
//   }
  
//   return response.json();
// }

export async function fetchData(endpoint: string, options: RequestInit = {}) {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  
  // Asegurar que siempre se incluyan las credenciales
  const fetchOptions: RequestInit = {
    ...options,
    credentials: 'include', // Esto es crucial para enviar/recibir cookies
  };
  
  return fetch(`${baseUrl}/${endpoint}`, fetchOptions)
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(err.detail || 'Ha ocurrido un error');
        });
      }
      return response.json();
    });
}