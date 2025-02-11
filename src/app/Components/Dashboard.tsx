'use client';
import React, { useState, useEffect } from 'react';
import { client } from "@/sanity/lib/client";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaUser, FaProductHunt, FaDollarSign, FaRegClock } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Item = {
  name: string;
  id: string;
  description: string;
  price: number;
};

type Customer = {
  name: string;
  email: string;
  phone: string;
  city: string;
  address1: string;
  address2: string;
  items: Item[];
};

const AdminDashboard: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [newUsers, setNewUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "customer"]{
        name,
        email,
        phone,
        city,
        address1,
        address2,
        items[] {
          name,
          id,
          description,
          price
        }
      }`;

      try {
        const data: Customer[] = await client.fetch(query);

        // Calculate total users
        const totalUsers = data.length;

        // Calculate total products by summing the length of items for all customers
        const totalProducts = data.reduce((acc: number, customer: Customer) => acc + customer.items.length, 0);

        // Calculate total orders (assuming 1 order per customer in this case)
        const totalOrders = data.length;

        // Calculate total revenue by summing up the price of all items
        const totalRevenue = data.reduce((acc: number, customer: Customer) => {
          return acc + customer.items.reduce((itemAcc: number, item: Item) => itemAcc + (Number(item.price) || 0), 0);
        }, 0);

        // Set the state variables
        setTotalUsers(totalUsers);
        setTotalProducts(totalProducts);
        setTotalOrders(totalOrders);
        setTotalRevenue(totalRevenue);

        setPendingOrders(totalOrders); // Static data for pending orders
        setNewUsers(totalUsers); // Static data for new users

      } catch (error) {
        console.error('Error fetching data from Sanity:', error);
      }
    };

    fetchData();
  }, []);

  // Chart Data for Users and Products
  const chartData = {
    labels: ['Total Users', 'Total Products'],
    datasets: [
      {
        label: 'Analytics',
        data: [totalUsers, totalProducts],
        backgroundColor: ['#4CAF50', '#FF9800'],
        borderColor: ['#4CAF50', '#FF9800'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-center mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Stats */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-blue-600">Total Users</h2>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>
          <FaUser className="text-blue-600 text-3xl" />
        </div>

        {/* Product Stats */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-blue-600">Total Products</h2>
            <p className="text-2xl font-bold">{totalProducts}</p>
          </div>
          <FaProductHunt className="text-blue-600 text-3xl" />
        </div>

        {/* Revenue Stats */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-blue-600">Total Revenue</h2>
            <p className="text-2xl font-bold">PKR {totalRevenue}</p>
          </div>
          <FaDollarSign className="text-blue-600 text-3xl" />
        </div>
       

        {/* Pending Orders Stats */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-blue-600">Pending Orders</h2>
            <p className="text-2xl font-bold">{pendingOrders}</p>
          </div>
          <FaRegClock className="text-blue-600 text-3xl" />
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 mt-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">User & Product Analytics</h2>
        <Bar data={chartData} options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Total Users vs Products',
            },
          },
        }} />
      </div>
    </div>
  );
};

export default AdminDashboard;
