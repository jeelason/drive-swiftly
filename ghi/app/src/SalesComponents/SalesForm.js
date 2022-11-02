import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Timer from "../UtilityComponents/Timer";

function SalesForm() {
  const [state, setState] = useState({
    sales_person: "",
    automobile: "",
    customer: "",
    price: "",
  });

  const [salesPersons, setSalesPersons] = useState([]);
  const [autos, setAutos] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sold, setSold] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    getSalesPersons();
    getCustomers();
    getAutos();
    getSales();
  }, []);

  function getSalesPersons() {
    fetch("http://localhost:8090/api/salespersons/")
      .then((res) => res.json())
      .then((d) => setSalesPersons(d.salespersons));
  }
  function getCustomers() {
    fetch("http://localhost:8090/api/customers/")
      .then((res) => res.json())
      .then((d) => setCustomers(d.customers));
  }
  function getAutos() {
    fetch("http://localhost:8100/api/automobiles/")
      .then((res) => res.json())
      .then((d) => setAutos(d.autos));
  }
  function getSales() {
    fetch("http://localhost:8090/api/sales/")
      .then((res) => res.json())
      .then((d) => setSold(d.sales));
  }

  const soldVins = sold.reduce((purchased, soldCar) => {
    purchased[soldCar.automobile] = true;
    return purchased;
  }, {});

  const filteredCars = autos.filter((unsold) => !soldVins[unsold.vin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const salesHistoryUrl = "http://localhost:8090/api/sales/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(salesHistoryUrl, fetchConfig);
    if (response.ok) {
      setState({
        sales_person: "",
        automobile: "",
        customer: "",
        price: "",
      });
      setHasSubmitted(true);
      setTimeout(() => setNavigate(true), 15000);
    }
  };

  if (navigate) {
    return <Navigate to="/sales/list" />;
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  let messageClasses = "alert alert-success d-none mb-3";
  let rtMsg = "alert alert-secondary d-none mb-3";
  let makeNew = "px-2 btn btn-primary d-none btn-lg active";
  let formClasses = "";
  let countDown = "";

  if (hasSubmitted) {
    messageClasses = "alert alert-success mb-3";
    rtMsg = "alert alert-secondary mb-3";
    formClasses = "d-none";
    makeNew = "btn btn-primary btn-lg active mb-3";
    countDown = <Timer count={15} />;
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Record a new sale</h1>
          <form
            onSubmit={handleSubmit}
            className={formClasses}
            id="create-sales-form"
          >
            <div className="mb-3">
              <select
                onChange={handleChange}
                value={state.automobile}
                required
                name="automobile"
                id="automobile"
                className="form-select"
              >
                <option value="">Choose an automobile</option>
                {filteredCars.map((auto) => {
                  return (
                    <option key={auto.href} value={auto.vin}>
                      {auto.year} {auto.color} {auto.model.manufacturer.name}{" "}
                      {auto.model.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={handleChange}
                value={state.salesPerson}
                required
                name="sales_person"
                id="sales_person"
                className="form-select"
              >
                <option value="">Choose a sales person</option>
                {salesPersons.map((salesperson) => {
                  return (
                    <option key={salesperson.name} value={salesperson.name}>
                      {salesperson.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={handleChange}
                value={state.customer}
                required
                name="customer"
                id="customer"
                className="form-select"
              >
                <option value="">Choose a customer</option>

                {customers.map((customer) => {
                  return (
                    <option key={customer.id} value={customer.name}>
                      {customer.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={state.price}
                placeholder="Sale price"
                required
                type="number"
                name="price"
                id="price"
                className="form-control"
              />
              <label htmlFor="price">Sale price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
          <div className={messageClasses} id="success-message">
            You've submitted a sales record!
          </div>
          <div className="d-flex justify-content-center">
            <a
              href="/sales"
              className={makeNew}
              role="button"
              aria-pressed="true"
            >
              Add Another Record
            </a>
          </div>
          <div className={rtMsg}>
            Redirect to sales list in {countDown} seconds...
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesForm;
