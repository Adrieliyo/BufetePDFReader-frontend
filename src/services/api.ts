export async function fetchData(endpoint: string, options?: RequestInit) {
  const response = await fetch(`http://localhost:8000/${endpoint}`, options);
  
  // Verificar si la respuesta fue exitosa
  if (!response.ok) {
      // Intentar obtener detalles del error si están disponibles
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.detail || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
  }
  
  return response.json();
}