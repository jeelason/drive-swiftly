import React from "react";

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      phoneNumber: "",
      hasSubmitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.phone_number = data.phoneNumber;
    delete data.hasSubmitted;
    delete data.phoneNumber;

    const nameUrl = "http://localhost:8090/api/customers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(nameUrl, fetchConfig);
    if (response.ok) {
      const cleared = {
        name: "",
        address: "",
        phoneNumber: "",
        hasSubmitted: true,
      };
      this.setState(cleared);
    }
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  render() {
    let messageClasses = "alert alert-success d-none mb-3";
    let makeNew = "d-none";
    let formClasses = "";

    if (this.state.hasSubmitted) {
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
              onSubmit={this.handleSubmit}
              className={formClasses}
              id="create-salesperson-form"
            >
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  value={this.state.name}
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
                  onChange={this.handleChange}
                  value={this.state.address}
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
                  onChange={this.handleChange}
                  value={this.state.phoneNumber}
                  placeholder="Phone Number"
                  required
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
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
}

export default CustomerForm;
