import React, { useState, useEffect } from "react";

function SalespersonList() {
  const [salespersons, setsalesPersons] = useState([]);

  useEffect(() => {
    const getSalespersonsData = async () => {
      const salespersonModelResponse = await fetch(
        "http://localhost:8090/api/salespersons/"
      );
      const salespersonModelData = await salespersonModelResponse.json();
      setsalesPersons(salespersonModelData.salespersons);
    };

    getSalespersonsData();
  }, []);

  return (
    <>
      <h1>Salesperson List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee Number</th>
          </tr>
        </thead>
        <tbody>
          {salespersons.map((salesperson) => {
            return (
              <tr key={salesperson.id}>
                <td>{salesperson.name}</td>
                <td>{salesperson.employee_number}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default SalespersonList;
