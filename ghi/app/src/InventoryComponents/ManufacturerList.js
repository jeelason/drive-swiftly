import React, { useState, useEffect } from "react";

function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    const fetchManufacturerData = async () => {
      const response = await fetch("http://localhost:8100/api/manufacturers/");
      const data = await response.json();
      setManufacturers(data.manufacturers);
    };
    fetchManufacturerData();
  }, []);

  return (
    <div>
      <h1 className="pt-3">Manufacturers List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer) => {
            return (
              <tr key={manufacturer.id}>
                <td>{manufacturer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ManufacturerList;
