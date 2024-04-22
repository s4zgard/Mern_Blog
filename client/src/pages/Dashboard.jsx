import { useLoaderData } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    const checkCookie = () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token"))
        ?.split("=")[1];
      if (!token) {
        localStorage.clear();
      }
    };

    checkCookie();
  }, []);
  const tab = useLoaderData();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar tab={tab} />
      </div>
      {tab === "profile" && <DashProfile />}
    </div>
  );
}
