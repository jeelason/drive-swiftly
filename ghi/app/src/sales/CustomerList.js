import React, { useState, useEffect } from "react";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomerlData = async () => {
      const customerModelResponse = await fetch(
        "http://localhost:8090/api/customers/"
      );
      const customerModelData = await customerModelResponse.json();
      setCustomers(customerModelData.customers);
    };

    getCustomerlData();
  }, []);

  return (
    <>
      <h1>Customer List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            return (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>{customer.phone_number}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default CustomerList;
