export async function fetchData(endpoint: string, options?: RequestInit) {
    const response = await fetch(`http://localhost:8000/${endpoint}`, options);
    return response.json();
  }