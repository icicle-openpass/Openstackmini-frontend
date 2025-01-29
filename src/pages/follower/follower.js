import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from '../../utils/axiosconfig';
import "./follower.css"; // Import the CSS file for styling

const Follower = () => {
  const [formData, setFormData] = useState({
    image_id: "",
    flavor: "",
    network: "",
    type: "",
    port: "",
    leader_ip: "",
    security_group: "",
    namespace: "",
  });
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/createfollowerserver", {
        image_id: formData.image_id,
        flavor: formData.flavor,
        network: formData.network,
        type: formData.type,
        port: formData.port,
        leader_ip: formData.leader_ip,
        security_group: formData.security_group,
        namespace: formData.namespace,
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = response.data;
      console.log("Form submitted successfully:", data);
      setRedirect(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to="/server" />;
  }

  return (
    <div className="form-container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form className="custom-form" onSubmit={handleSubmit}>
          <h2>Configuration Form</h2>
          {Object.keys(formData).map((field) => (
            <div key={field} className="form-group">
              <label htmlFor={field}>{field.replace("_", " ").toUpperCase()}</label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
                required
              />
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Follower;
