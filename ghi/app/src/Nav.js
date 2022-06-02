import { NavLink } from "react-router-dom";
import Switch from "./UtilityComponents/Switch";

function Nav({ darkTheme, onThemeChange }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid" id="work">
        <NavLink className="navbar-brand" to="/">
          Drive Schwifty
        </NavLink>
        <div className="p-2 dropdown">
          <NavLink
            className="btn btn-secondary dropdown-toggle"
            to="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Inventory
          </NavLink>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <NavLink className="dropdown-item" to="/manufacturers/">
              Show Manufacturers
            </NavLink>
            <NavLink className="dropdown-item" to="/manufacturers/create/">
              Create Manufacturer
            </NavLink>
            <NavLink className="dropdown-item" to="/automobiles/">
              Show Automobiles
            </NavLink>
            <NavLink className="dropdown-item" to="/automobiles/create/">
              Create Automobiles
            </NavLink>
            <NavLink className="dropdown-item" to="/vehicles/">
              Show Vehicle Models
            </NavLink>
            <NavLink className="dropdown-item" to="/vehicles/create/">
              Create Vehicle Model
            </NavLink>
          </div>
        </div>
        <div className="p-2 dropdown">
          <NavLink
            className="btn btn-secondary dropdown-toggle"
            to="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Services
          </NavLink>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <NavLink className="dropdown-item" to="/technicians/">
              Create Technician
            </NavLink>
            <NavLink className="dropdown-item" to="/appointments/">
              Show Appointments
            </NavLink>
            <NavLink className="dropdown-item" to="/appointments/create/">
              Create Appointment
            </NavLink>
            <NavLink className="dropdown-item" to="/appointments/history/">
              Show Appointment History
            </NavLink>
          </div>
        </div>
        <div className="p-2 dropdown">
          <NavLink
            className="btn btn-secondary dropdown-toggle"
            to="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sales
          </NavLink>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <NavLink className="dropdown-item" to="/salesperson">
              New Salesperson
            </NavLink>
            <NavLink className="dropdown-item" to="/salesperson/list">
              Salesperson List
            </NavLink>
            <NavLink className="dropdown-item" to="/customer">
              New Customer
            </NavLink>
            <NavLink className="dropdown-item" to="/customer/list">
              Customer List
            </NavLink>
            <NavLink className="dropdown-item" to="/sales">
              New Sales Record
            </NavLink>
            <NavLink className="dropdown-item" to="/sales/list">
              Sales List
            </NavLink>
            <NavLink className="dropdown-item" to="/sales/history">
              Salesperson History
            </NavLink>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"></li>
          </ul>
        </div>
        <i className="fa-solid fa-sun"></i>
        <Switch toggled={darkTheme} onToggled={onThemeChange} />
        <i className="fa-solid fa-moon"></i>
      </div>
    </nav>
  );
}

export default Nav;
