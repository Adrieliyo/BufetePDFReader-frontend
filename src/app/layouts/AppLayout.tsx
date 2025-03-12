import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";

export function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}