import { Outlet } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Navigation } from "./components/navigation/Navigation";

const Layout = () => {
  return (
    <>
      <Header />

      <Outlet />

      <Navigation />
    </>
  );
};

export default Layout;
