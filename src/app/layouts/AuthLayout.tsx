import { Outlet } from "react-router-dom";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "../../components/Button";

export function AuthLayout() {
  // const navigate = useNavigate();
  // const location = useLocation();

  // const isLoginPage = location.pathname === "/auth/login";

  // const handleToggle = () => {
  //   if (isLoginPage) {
  //     navigate("/auth/register");
  //   } else {
  //     navigate("/auth/login");
  //   }
  // };

  return (
    // <div classNameName="min-h-screen flex items-center justify-center bg-gray-50">
    //   <div classNameName="max-w-md w-full p-6 bg-white rounded shadow-md">
    //     <Outlet />
    //     <Button 
    //       onClick={handleToggle}
    //       classNameName="mt-4 w-full"
    //     >
    //       {isLoginPage ? "Ir a Registro" : "Ir a Login"}
    //     </Button>
    //   </div>
    // </div>

    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <Outlet />
      </div>
    </div>

  );
}