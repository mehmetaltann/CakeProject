import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Materials from "./pages/Materials";
import SemiProducts from "./pages/SemiProducts";
import NavBar from "./layouts/NavBar";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/musteriler",
    component: Customers,
  },
  {
    path: "/malzemeler",
    component: Materials,
  },
  {
    path: "/siparisler",
    component: Orders,
  },
  {
    path: "/tarifler",
    component: SemiProducts,
  },
];

export const Rotalar = () => {
  // const user = localStorage.getItem("token");
  const user = "hep var";
  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
          </>
        ) : (
          <Route
            element={
              <>
                <NavBar />
                <Outlet />
              </>
            }
          >
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};
