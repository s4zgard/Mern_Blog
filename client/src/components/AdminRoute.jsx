import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser.isAdmin ? <Outlet /> : <Navigate to="sign-in" />;
}
