import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {

    // Este componente se encarga de verificar si el usuario está autenticado.

    const isAuth = !!localStorage.getItem("token");

    return isAuth ? <Outlet/> : <Navigate to="/auth/login"/>

  
}
