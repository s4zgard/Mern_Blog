import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import FooterComp from "../components/Footer";

export default function Root() {
  return (
    <div>
      <Header />
      <Outlet />
      <FooterComp />
    </div>
  );
}
