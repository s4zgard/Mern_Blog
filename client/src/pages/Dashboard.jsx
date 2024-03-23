import { useLoaderData } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

export default function Dashboard() {
  const tab = useLoaderData();
  console.log(tab);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar tab={tab} />
      </div>
      {tab === "profile" && <DashProfile />}
    </div>
  );
}
