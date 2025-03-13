import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { AppLayout } from "./layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";

import { LoginPage } from "../features/auth/LoginPage";
import { RegisterPage } from "../features/auth/RegisterPage";
import { VerifyUserPage } from "../features/auth/VerifyUserPage";
import { HomePage } from "../features/home/HomePage";

import { RecoverPasswordLayout } from "./layouts/RecoverPasswordLayout";
import { RecoverPasswordPage } from "../features/recover-password/RecoverPasswordPage";

import { UploadPage } from "../features/upload/UploadPage";
import { DocumentViewerPage } from "../features/upload/DocumentViewerPage";
import { SettingsPage } from "../features/settings/SettingsPage";


 const router = createBrowserRouter([
    {
        path: "/auth", element: <AuthLayout/>, children: [
            { path: "login", element: <LoginPage/> },
            { path: "register", element: <RegisterPage/> },
        ]
    },
    {
        path: "/recover-password", element: <RecoverPasswordLayout/>, children: [
            { path: "", element: <RecoverPasswordPage/> }
        ]
    },
    {
        path: "/verify-user", element: <VerifyUserPage/>
    },
    {
        path: "/", element: <ProtectedRoute/>, children: [
            {
                path: "", element: <AppLayout/>, children: [
                    {path: "home", element: <HomePage/>},
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