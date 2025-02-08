'use client'
import React, { useState, useEffect } from 'react';
import { client } from "@/sanity/lib/client";// Make sure the client is configured

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
      // The query you provided to fetch customer details
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
        const data: Customer[] = await client.fetch(query); // Explicitly type the fetched data as an array of customers

        // Calculate total users
        const totalUsers = data.length;

        // Calculate total products by summing the length of items for all customers
        const totalProducts = data.reduce((acc: number, customer: Customer) => acc + customer.items.length, 0);

        // Calculate total orders (assuming 1 order per customer in this case)
        const totalOrders = data.length;

        // Calculate total revenue by summing up the price of all items
        const totalRevenue = data.reduce((acc: number, customer: Customer) => {
          return acc + customer.items.reduce((itemAcc: number, item: Item) => itemAcc + item.price, 0);
        }, 0);

        // Set the state variables
        setTotalUsers(totalUsers);
        setTotalProducts(totalProducts);
        setTotalOrders(totalOrders);
        setTotalRevenue(totalRevenue);
        
        // Static data for Pending Orders and New Users (You can adjust based on your needs)
        setPendingOrders(45); // Static data for pending orders
        setNewUsers(12); // Static data for new users

      } catch (error) {
        console.error('Error fetching data from Sanity:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow-md border border-black border-opacity-25">
          <h2 className="text-xl font-semibold text-blue-600">Total Users</h2>
          <p className="text-xl font-bold">{totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md border border-black border-opacity-25">
          <h2 className="text-xl font-semibold text-blue-600">Total Products</h2>
          <p className="text-xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md border border-black border-opacity-25">
          <h2 className="text-xl font-semibold text-blue-600">Total Orders</h2>
          <p className="text-xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md border border-black border-opacity-25">
          <h2 className="text-xl font-semibold text-blue-600">Total Revenue</h2>
          <p className="text-xl font-bold">PKR {totalRevenue}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md border border-black border-opacity-25">
          <h2 className="text-xl font-semibold text-blue-600">Pending Orders</h2>
          <p className="text-xl font-bold">{pendingOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md border border-black border-opacity-25">
          <h2 className="text-xl font-semibold text-blue-600">New Users</h2>
          <p className="text-xl font-bold">{newUsers}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;



