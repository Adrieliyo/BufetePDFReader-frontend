import { Outlet } from "react-router-dom";

export function RecoverPasswordLayout() {
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full h-[25em] flex">
                <Outlet />
            </div>
        </div>
    )
}