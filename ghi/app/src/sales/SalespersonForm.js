import React, { useState } from "react";

function SalespersonForm() {
  const [state, setState] = useState({
    name: "",
    employee_number: "",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameUrl = "http://localhost:8090/api/salespersons/";
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
        employee_number: "",
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
          <h1>Add a Salesperson</h1>
          <form
            onSubmit={handleSubmit}
            className={formClasses}
            id="create-salesperson-form"
          >
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={state.name}
                placeholder="Salesperson Name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Salesperson Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={state.employee_number}
                placeholder="Employee Number"
                required
                type="number"
                name="employee_number"
                id="employee_number"
                className="form-control"
              />
              <label htmlFor="employee_number">Employee Number</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
          <div className={messageClasses} id="success-message">
            You've added a salesperson!
          </div>
          <div className="d-flex justify-content-around">
            <a href="/salesperson" className={makeNew}>
              Add Another Salesperson
            </a>
            <a href="/salesperson/list" className={makeNew}>
              Go to Salesperson List
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalespersonForm;
