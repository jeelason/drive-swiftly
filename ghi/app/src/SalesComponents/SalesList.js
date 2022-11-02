import React, { useState, useEffect } from "react";

function SalesList() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getSales();
  }, []);

  function getSales() {
    fetch("http://localhost:8090/api/sales/")
      .then((res) => res.json())
      .then((d) => setSales(d.sales));
  }

  return (
    <>
      <h1>Sales List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sales person</th>
            <th>Employee number</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Sale Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((salesperson) => {
            return (
              <tr key={salesperson.automobile}>
                <td>{salesperson.sales_person}</td>
                <td>{salesperson.employee_no}</td>
                <td>{salesperson.customer}</td>
                <td>{salesperson.automobile}</td>
                <td>${salesperson.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default SalesList;
