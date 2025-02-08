"use client";
import React, { useState } from "react";
import { z } from "zod";
import { SiOpenmediavault } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import AdminDashboard from "./Dashboard";
import UsersPage from "./Users";
import ProductsPage from "./Product";
import OrdersPage from "./Orders";

const loginSchema = z.object({
  adminName: z.string().min(1, "Admin Name is required"),
  password: z.string().min(1, "Password is required"),
});

// Define the type for the errors state
type Errors = {
  adminName?: string;
  password?: string;
  credentials?: string;
};

const Login = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({ adminName: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = loginSchema.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors: Errors = {};
      validationResult.error.errors.forEach((error) => {
        fieldErrors[error.path[0] as keyof Errors] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Check credentials
    if (formData.adminName === "ZubairRiaz" && formData.password === "1718") {
      setIsLoggedIn(true);
      setErrors({});
    } else {
      setErrors({ credentials: "Invalid Admin Name or Password" });
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return <div><UsersPage/></div>;
      case "products":
        return <div><ProductsPage /></div>;
      case "orders":
        return <div><OrdersPage /></div>;
      default:
        return <div><AdminDashboard/></div>;
    }
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setFormData({ adminName: "", password: "" })
  }



  return (
    <div>
      {isLoggedIn ? (
        <div className="flex h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)]">
          {/* Sidebar */}
          <aside
            onClick={toggleSidebar}
            className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-500 shadow-md transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0`}
          >
            <div className="p-2 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Hekto Dashboard</h2>
              <IoClose
                onClick={toggleSidebar}
                size={30}
                className="text-white sm:hidden border rounded-md"
              />
            </div>
            <nav className="mt-6">
              <ul>
                <li onClick={() => setActiveSection("dashboard")} className="p-4 hover:bg-blue-400 cursor-pointer text-white">
                  Dashboard
                </li>
                <li onClick={() => setActiveSection("users")} className="p-4 hover:bg-blue-400 cursor-pointer text-white">
                  Users
                </li>
                <li onClick={() => setActiveSection("products")} className="p-4 hover:bg-blue-400 cursor-pointer text-white">
                  Products
                </li>
                <li onClick={() => setActiveSection("orders")} className="p-4 hover:bg-blue-400 cursor-pointer text-white">
                  Orders
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 md:ml-64 py-4 px-2">
            <header className="flex items-center justify-between mb-6 bg-blue-500 text-white py-3 sm:p-4 rounded-md">
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 bg-blue-500 text-white rounded"
              >
                {isSidebarOpen ? <IoClose /> : <SiOpenmediavault size={25}/>}
              </button>
              <h1 className="sm:text-3xl text-2xl font-bold text-center">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Overview
              </h1>
              <button onClick={logOut} className="border mr-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                Logout
              </button>
            </header>

            {/* Content Area */}
            <div className="grid grid-cols-1 gap-6">
              {renderContent()}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">Hekto Admin Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Admin Name</label>
                <input
                  type="text"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  className={`border p-2 w-full rounded-sm ${
                    errors.adminName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.adminName && (
                  <p className="text-red-500">{errors.adminName}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`border p-2 w-full rounded-sm ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>
              {errors.credentials && (
                <p className="text-red-500">{errors.credentials}</p>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

