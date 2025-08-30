import { Suspense, useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </Suspense>

      <div
        className={`transition-all duration-300 ease-in-out flex-1 flex flex-col 
      bg-gradient-to-br from-green-100 to-green-200
      ${isOpen ? "ml-64" : "ml-16"}`}
      >
        <Outlet />
      </div>
    </div>
  );
}
