import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { AppLayout } from "./layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import { LoginPage } from "../features/auth/LoginPage";
import { RegisterPage } from "../features/auth/RegisterPage";
import { UploadPage } from "../features/upload/UploadPage";
import { DocumentViewerPage } from "../features/upload/DocumentViewerPage";
import { SettingsPage } from "../features/settings/SettingsPage";


 const router = createBrowserRouter([
    {
        path: "/auth", element: <AuthLayout/>, children: [
            { path: "login", element: <LoginPage/> },
            { path: "register", element: <RegisterPage/> }
        ]
    },
    {
        path: "/", element: <ProtectedRoute/>, children: [
            {
                path: "", element: <AppLayout/>, children: [
                    { path: "upload", element: <UploadPage/> },
                    { path: "viewer", element: <DocumentViewerPage/>},
                    { path: "settings", element: <SettingsPage/>}
                ]
            }
        ]
    }
 ])

 export default function AppRouter() {
    return <RouterProvider router={router}/>
 }