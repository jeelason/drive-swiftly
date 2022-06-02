import React, { useState, useEffect } from "react";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointmentData = async () => {
    const responseAppointment = await fetch(
      "http://localhost:8080/api/appointments/"
    );
    const appointmentData = await responseAppointment.json();
    const filteredAppointmentData = appointmentData.appointments.filter(
      appointment => appointment.finished === false
    );
    setAppointments(filteredAppointmentData);
  };

  useEffect(() => {
    fetchAppointmentData();
  }, []);

  const deleteAppointment = async id => {
    await fetch(`http://localhost:8080/api/appointments/${id}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };

  const updateAppointment = async id => {
    const appointmentUrl = `http://localhost:8080/api/appointments/${id}/`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify({
        finished: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(appointmentUrl, fetchConfig);

    if (response.ok) {
      await fetchAppointmentData();
    }
  };

  const handleClick = id => {
    updateAppointment(id);
  };

  return (
    <>
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
          {appointments &&
            appointments.map(appointment => {
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
                  <td>
                    <button
                      onClick={async () => {
                        await deleteAppointment(appointment.id);
                        await fetchAppointmentData();
                      }}
                    >
                      Cancel
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn btn-success'
                      onClick={() => handleClick(appointment.id)}
                    >
                      Finished
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default AppointmentList;
