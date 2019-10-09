import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

/**
 * check to see if there is any alerts in the array.
 * if there is then map through it.
 * for each alert output a div. add key to the div.
 * add dynamic className based on the type of the message.
 * output jsx
 */

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" /> {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
