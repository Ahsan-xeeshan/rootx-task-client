import { Link, useNavigate } from "react-router";
import { FaHome } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { IoIosLogOut } from "react-icons/io";
import api from "../api";

const Sidebar = ({ isOpen }) => {
  const nav = useNavigate();
  const handleSignOut = async () => {
    try {
      await api.post(
        "/authentication/logout",
        {},
        { withCredentials: true }
      );

      nav("/login"); // navigate to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out z-40
    ${isOpen ? "w-64" : "w-16"}
  `}
    >
      <h2 className="text-xl font-bold mb-6 p-5">Task Manager Pro</h2>
      <nav className="flex flex-col gap-3">
        <Link
          to="/dashboard"
          className="flex items-center gap-x-5 px-3 py-2 rounded hover:bg-gray-700 transition cursor-pointer"
        >
          <FaHome />
          Home
        </Link>
        <Link
          to="/create-task"
          className="flex items-center gap-x-5 px-3 py-2 rounded hover:bg-gray-700 transition cursor-pointer"
        >
          <TfiWrite />
          Create Task
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-x-5 px-3 py-2 rounded bg-red-600 hover:bg-red-500 transition mt-auto cursor-pointer"
        >
          <IoIosLogOut /> Sign Out
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
