import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <div className="text-lg font-bold font-mono">Router</div>
      <Outlet />
    </div>
  );
}
