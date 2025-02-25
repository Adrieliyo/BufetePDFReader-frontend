import { useState } from "react";
import { login } from "../services/authService";

// Este hook se encarga de manejar la autenticación de un usuario.
// Retorna el usuario autenticado y la función para iniciar sesión.

export function useAuth() {
  const [user, setUser] = useState(null);

  async function handleLogin(email: string, password: string) {
    const data = await login(email, password);
    setUser(data.user);
  }

  return { user, handleLogin };
}
