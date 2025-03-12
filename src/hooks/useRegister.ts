import { useState } from "react";
import { register } from "../services/registerService";

export function useRegister() {
  const [user, setUser] = useState(null);

  async function handleRegister(username: string, names: string, lastnames: string, email: string, password: string) {
    console.log('useRegister.handleRegister called with:', username, names, lastnames, email, password);
    const data = await register(username, names, lastnames, email, password);
    console.log('useRegister.handleRegister response:', data);
    setUser(data);
    return data;
  }

  return { user, handleRegister };
}