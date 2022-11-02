import React from "react";

class SalesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
    };
  }
  async componentDidMount() {
    const url = "http://localhost:8090/api/sales/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ sales: data.sales });
    }
  }

  render() {
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
            {this.state.sales.map((salesperson) => {
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
}

export default SalesList;
