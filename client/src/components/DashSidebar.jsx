import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChat,
  HiDocument,
  HiDocumentText,
  HiUser,
  HiUsers,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function DashSidebar({ tab }) {
  const { currentUser } = useSelector((state) => state.user);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        window.localStorage.clear();
        window.location.reload();
      }
      if (!res.ok) {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className="w-full ">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin " : "User"}
              labelColor="dark"
              as={"div"}
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <>
              <Link to="/dashboard?tab=posts">
                <Sidebar.Item
                  active={tab === "posts"}
                  icon={HiDocumentText}
                  labelColor="dark"
                  as={"div"}
                >
                  Posts
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=users">
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiUsers}
                  labelColor="dark"
                  as={"div"}
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=comments">
                <Sidebar.Item
                  active={tab === "comments"}
                  icon={HiChat}
                  labelColor="dark"
                  as={"div"}
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
