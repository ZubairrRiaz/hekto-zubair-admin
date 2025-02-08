"use client";
import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";// Make sure the client is configured

// GROQ query to fetch the customer data
const fetchCustomerData = async () => {
  try {
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

    const customers = await client.fetch(query);
    return customers;
  } catch (error) {
    console.error("Error fetching customer data:", error);
    alert("Failed to load customer data");
    return [];
  }
};

const UsersPage = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCustomerData = async () => {
      const data = await fetchCustomerData();
      setCustomers(data);
      setLoading(false);
    };
    loadCustomerData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Customer List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <div
              key={customer._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-semibold text-blue-800 py-2">{customer.name}</h2>
              <p className="text-gray-500">Email: {customer.email}</p>
              <p className="text-gray-500">Phone No: {customer.phone}</p>
              <p className="text-gray-500">City: {customer.city}</p>
              <p className="text-gray-500">Address 1: {customer.address1}</p>
              <p className="text-gray-500">Address 2: {customer.address2}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-red-600">No customers found</p>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
