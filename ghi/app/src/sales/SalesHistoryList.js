import React, { useEffect, useState } from "react";

function SalesHistoryList() {
  const [salesPersons, setSalesPersons] = useState([]);
  const [salesPerson, setSalesPerson] = useState([]);
  const [salesRecord, setSalesRecord] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);

  useEffect(() => {
    const getSalesPersonsData = async () => {
      const salesPersonsResponse = await fetch(
        "http://localhost:8090/api/salespersons/"
      );
      const salesPersonsData = await salesPersonsResponse.json();
      setSalesPersons(salesPersonsData.salespersons);
    };
    getSalesPersonsData();
  }, []);

  useEffect(() => {
    const getSalesRecordData = async () => {
      const salesRecordResponse = await fetch(
        "http://localhost:8090/api/sales/"
      );
      const salesRecordData = await salesRecordResponse.json();
      setSalesRecord(salesRecordData.sales);
    };
    getSalesRecordData();
  }, []);

  useEffect(() => {
    const getSalesData = () => {
      if (!salesRecord) {
        return;
      }
      const salesRecordData = salesRecord.filter(
        (sale) => sale.employee_no === Number(salesPerson)
      );
      setFilteredSales(salesRecordData);
    };
    getSalesData();
  }, [salesRecord, salesPerson]);

  const handleChange = (event) => {
    setSalesPerson(event.target.value);
  };

  return (
    <>
      <h1>Sales Person History</h1>
      <select
        onChange={handleChange}
        value={salesRecord}
        className="form-select"
        name="salesPerson"
        id="salesPerson"
        aria-label="Default select example"
      >
        <option>Select a Salesperson</option>
        {salesPersons.map((salesperson) => {
          return (
            <option
              key={salesperson.employee_number}
              value={salesperson.employee_number}
            >
              {salesperson.name}
            </option>
          );
        })}
      </select>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sales person</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Sale Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale) => {
            return (
              <tr key={sale.automobile}>
                <td>{sale.sales_person}</td>
                <td>{sale.customer}</td>
                <td>{sale.automobile}</td>
                <td>${sale.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default SalesHistoryList;
