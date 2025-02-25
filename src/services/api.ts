export async function fetchData(endpoint: string, options?: RequestInit) {
    const response = await fetch(`https://api.miapp.com/${endpoint}`, options);
    return response.json();
  }