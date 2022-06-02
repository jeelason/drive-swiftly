import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import MainPage from "./MainPage";
import Nav from "./Nav";

import AppointmentList from "./ServiceComponents/AppointmentList";
import TechnicianForm from "./ServiceComponents/TechnicianForm";
import AppointmentForm from "./ServiceComponents/AppointmentForm";
import AppointmentHistory from "./ServiceComponents/AppointmentHistory";

import ManufacturerList from "./InventoryComponents/ManufacturerList";
import ManufacturerForm from "./InventoryComponents/ManufacturerForm";
import AutomobileList from "./InventoryComponents/AutomobileList";
import AutomobileForm from "./InventoryComponents/AutomobileForm";
import VehicleList from "./InventoryComponents/VehicleList";
import VehicleForm from "./InventoryComponents/VehicleForm";

import SalespersonForm from "./sales/SalespersonForm";
import SalespersonList from "./sales/SalespersonList";
import CustomerForm from "./sales/CustomerForm";
import CustomerList from "./sales/CustomerList";
import SalesForm from "./sales/SalesForm";
import SalesList from "./sales/SalesList";
import SalesHistoryList from "./sales/SalesHistoryList";

import "./App.css";

function App(props) {
  const [darkTheme, setDarkTheme] = useState(() => {
    const saved = localStorage.getItem("darkTheme");
    const initialValue = JSON.parse(saved);
    console.log(initialValue);
    return initialValue === null ? true : initialValue;
  });

  const handleThemeChange = () => {
    setDarkTheme(!darkTheme);
  };

  useEffect(() => {
    localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  return (
    <div id="App" className={darkTheme ? "dark-mode" : "light-mode"}>
      <Nav darkTheme={darkTheme} onThemeChange={handleThemeChange} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="appointments">
          <Route index element={<AppointmentList />} />
          <Route path="create/" element={<AppointmentForm />} />
          <Route path="history/" element={<AppointmentHistory />} />
        </Route>
        <Route path="technicians">
          <Route index element={<TechnicianForm />} />
        </Route>
        <Route path="manufacturers">
          <Route index element={<ManufacturerList />} />
          <Route path="create/" element={<ManufacturerForm />} />
        </Route>
        <Route path="automobiles">
          <Route index element={<AutomobileList />} />
          <Route path="create" element={<AutomobileForm />} />
        </Route>
        <Route path="vehicles">
          <Route index element={<VehicleList />} />
          <Route path="create" element={<VehicleForm />} />
        </Route>
        <Route path="salesperson">
          <Route index element={<SalespersonForm />} />
          <Route path="list" element={<SalespersonList />} />
        </Route>
        <Route path="customer">
          <Route path="" element={<CustomerForm />} />
          <Route path="list" element={<CustomerList />} />
        </Route>
        <Route path="sales">
          <Route path="" element={<SalesForm />} />
          <Route path="list" element={<SalesList />} />
          <Route path="history" element={<SalesHistoryList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
//Schifty
