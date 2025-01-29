import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import OpenstackMini from "../images/Openstack_Mini.png";
import axiosInstance from "../utils/axiosconfig";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCreateServer, setModalCreateServer] = useState(false);
  const [apiUtility, setApiUtility] = useState("")
  const [modalTitle, setModalTitle] = useState("");
  const [apiData, setApiData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [output, setOutput] = useState("---- OUTPUT ----");
  const [detailedOutput, setDetailedOutput] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image_id: "aec23101-7da7-4ba3-98a8-47b8f1c75bc1", // Default value
    flavor: "", // Will be set after fetching options
    network: "digitalagci", // Default value
    security_group: "world-icicle", // Default value
  });

  const [flavors, setFlavors] = useState([]); // Store flavors from 
  
  useEffect(() => {
    const fetchFlavors = async () => {
      try {
        const response = await axiosInstance.post("/getflavorlist"); // API endpoint to fetch flavors
        setFlavors(response.data); // Assuming API returns an array of flavors
        setFormData((prevData) => ({
          ...prevData,
          flavor: response.data.length > 0 ? response.data[0].name : "", // Set default flavor
        }));
      } catch (error) {
        console.error("Error fetching flavors:", error);
      }
    };

    fetchFlavors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData);
    try {
      const response = await axiosInstance.post("/createfollowerserver", formData);
      setModalCreateServer(false);
      setDetailedOutput(response.data);
    } catch (error) {
      console.error("Error creating server:", error);
      alert("Failed to create server.");
    }
    setIsLoading(false);
  };

  // Function to fetch initial data from API
  const fetchData = async (endpoint) => {
    try {
      const response = await axiosInstance.get(endpoint);
      setApiData(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log(selectedItem)
      setApiData(["Error fetching data"]);
    }
  };


  // Function to handle item selection & call API with selected item
  const handleSelectItem = async (item) => {
    setSelectedItem(item);
    setModalOpen(false); // Close modal before making API call
    setOutput(`Selected: ${item}`); // Set plain text output
    var endpoint = ""
    if(apiUtility === "getservernamelist"){
      endpoint = "getserverdetails"
    }else if(apiUtility === "getnetworknamelist"){
      endpoint = "getnetworkdetails"
    }else if(apiUtility === "deleteableinstancelist"){
      endpoint = "deleteserver"
    }else{
      endpoint = apiUtility;
    }

    try {
      const response = await axiosInstance.post(endpoint ,JSON.stringify({ resourcename: item })); 
      setDetailedOutput(response.data); // Assuming API returns a 'result' field
    } catch (error) {
      console.error("Error fetching response:", error);
      setDetailedOutput("Error fetching response");
    }
  };

  // Function to handle grid item click (open modal)
  const handleOpenModal = (endpoint, title) => {
    setModalTitle(title);
    setApiUtility(endpoint);
    if (endpoint === "getimagelist" || endpoint === "getflavorlist"){
      handleSelectItem(endpoint);
      setApiUtility(endpoint);
    }else{
      fetchData(endpoint);
    }
  };

  const handleCreateServerOpenModal = (endpoint, title) => {
    setModalTitle(title);
    setModalCreateServer(true);
  };

  return (
    <div className="container">
      {/* Header Image Section */}
      <div className="header-image">
        <img src={OpenstackMini} alt="Introduction" className="image" />
      </div>

      {/* Grid Section */}
      <div className="grid-container">
        <div className="box" onClick={() => handleOpenModal("getservernamelist", "Server")}>Server</div>
        <div className="box" onClick={() => handleOpenModal("getnetworknamelist", "Network")}>Network</div>
        <div className="box" onClick={() => handleOpenModal("getimagelist", "Image")}>Image</div>
        <div className="box" onClick={() => handleOpenModal("getflavorlist", "Flavor")}>Flavor</div>
        <div className="box" onClick={() => handleCreateServerOpenModal("createserver", "Create OpenMobile Server")}>
          Create OpenMobile Server
        </div>
        <div className="box" onClick={() => handleOpenModal("deleteableinstancelist", "Terminate Instance")}>Terminate Instance</div>
      </div>

      {/* Output Section */}
      <div className="grid-container">
        <div className="box_cmd">
          <p className="output-text">{output}</p>
          <div className="output-box">
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", textAlign:"left" }}>
              {JSON.stringify(detailedOutput, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalTitle}</h2>
            <p>Select an option:</p>
            <ul>
              {apiData.length > 0 ? (
                apiData.map((item, index) => (
                  <li key={index} onClick={() => handleSelectItem(item)} className="modal-item">
                    {item}
                  </li>
                ))
              ) : (
                <p>You Dont have any resources right now!!<br/> Wait for some time...</p>
              )}
            </ul>
            <div className="formdivbtn">
              <button onClick={() => setModalOpen(false)} className="button-12">Close</button>
            </div>
          </div>
        </div>
      )}


      {modalCreateServer && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalTitle}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form">
                <div className="formdiv">
                  <label style={{ width: "100%" }}>Server Name</label>
                  <br />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                  <br />
                </div>
                <div className="formdiv">
                  <label>Server Type</label>
                  <br />
                  <select name="flavor" value={formData.flavor} onChange={handleChange}>
                    {flavors.length > 0 ? (
                      flavors.map((flavor, index) => (
                        <option key={index} value={flavor.name}>
                          {flavor.name} RAM: {flavor.ram} DISK: {flavor.disk}
                        </option>
                      ))
                    ) : (
                      <option value="">Loading...</option>
                    )}
                  </select>
                  <br />
                </div>
                <div className="formdiv">
                  <label>Server Image Id</label>
                  <br />
                  <input type="text" name="image_id" value={formData.image_id} disabled />
                  <br />
                </div>
                <div className="formdiv">
                  <label>Server Network</label>
                  <br />
                  <input type="text" name="network" value={formData.network} disabled />
                  <br />
                </div>
                <div className="formdiv">
                  <label>Server Security Group</label>
                  <br />
                  <input type="text" name="security_group" value={formData.security_group} disabled />
                </div>
                <div className="formdivbtn">
                  <button type="submit" className="button-12" disabled={isLoading}>{isLoading ? "Submitting..." : "Create Server"}</button>
                </div>
              </div>
            </form>
            <div className="formdivbtn">
              <button onClick={() => setModalCreateServer(false)}  className="button-12" >Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;