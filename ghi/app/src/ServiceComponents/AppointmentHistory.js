import React, { useState, useEffect } from "react";

function AppointmentHistory() {
  const [search, setSearch] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      const responseAppointment = await fetch(
        "http://localhost:8080/api/appointments/"
      );
      const appointmentData = await responseAppointment.json();
      const filteredAppointmentData = appointmentData.appointments.filter(
        appointment => appointment.finished === true
      );
      setAppointments(filteredAppointmentData);
    };

    fetchAppointmentData();
  }, []);

  const handleClick = () => {
    const filtered = appointments.filter(
      appointment => appointment.vin === search
    );
    setFilteredAppointments(filtered);
  };

  return (
    <>
      <form
        className='form-inline'
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div className='input-group p-2'>
          <input
            className='form-control mr-sm-2 pr-3'
            type='search'
            placeholder='Search vins'
            onChange={event => setSearch(event.target.value)}
          />
          <div className='px-2'>
            <button
              className='btn btn-outline-success my-2 my-sm-0'
              onClick={handleClick}
              type='submit'
            >
              Search VINs
            </button>
          </div>
        </div>
      </form>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Vip</th>
            <th>Vin</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map(appointment => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.customer_name}</td>
                {appointment.vip && <td>True</td>}
                {!appointment.vip && <td>False</td>}
                <td>{appointment.vin}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.technician.employee_number}</td>
                <td>{appointment.reason}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AppointmentHistory;
