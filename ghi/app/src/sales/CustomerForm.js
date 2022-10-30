import React, { useState } from "react";

function CustomerForm() {
  const [state, setState] = useState({
    name: "",
    address: "",
    phone_number: "",
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameUrl = "http://localhost:8090/api/customers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(nameUrl, fetchConfig);
    if (response.ok) {
      setState({
        name: "",
        address: "",
        phone_number: "",
      });
      setHasSubmitted(true);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({ ...state, [e.target.id]: value });
  };

  let messageClasses = "alert alert-success d-none mb-3";
  let makeNew = "d-none";
  let formClasses = "";

  if (hasSubmitted) {
    formClasses = "d-none";
    messageClasses = "alert alert-success mb-3";
    makeNew = "btn btn-primary btn-sm active mb-3";
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Customer</h1>
          <form
            onSubmit={handleSubmit}
            className={formClasses}
            id="create-salesperson-form"
          >
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={state.name}
                placeholder="Customer Name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Customer Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={state.address}
                placeholder="Address"
                required
                type="text"
                name="address"
                id="address"
                className="form-control"
              />
              <label htmlFor="address">Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={state.phone_number}
                placeholder="Phone Number"
                required
                type="number"
                name="phone_number"
                id="phone_number"
                className="form-control"
              />
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
          <div className={messageClasses} id="success-message">
            You've added a customer!
          </div>
          <div className="d-flex justify-content-around">
            <a href="/customer" className={makeNew}>
              Add Another Customer
            </a>
            <a href="/customer/list" className={makeNew}>
              Go to Customer List
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
