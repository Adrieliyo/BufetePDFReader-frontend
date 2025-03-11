import { useState } from "react";
import { login } from "../services/authService";

// Este hook se encarga de manejar la autenticación de un usuario.
// Retorna el usuario autenticado y la función para iniciar sesión.

export function useAuth() {
  const [user, setUser] = useState(null);

  async function handleLogin(email_or_username: string, password: string) {
    console.log('useAuth.handleLogin called with:', email_or_username);
    const data = await login(email_or_username, password);
    console.log('useAuth.handleLogin response:', data);
    setUser(data);
    return data; // Devolver los datos para que puedas usarlos en el componente
  }

  return { user, handleLogin };
}
