import React, { useState, useEffect } from "react";
import axiosInstance from '../../utils/axiosconfig';

const Flavor = () => {
  // State to store the data fetched from the API
    const [tableData, setTableData] = useState([]);
  
    // Fetch data from the API on component mount
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get("/getflavorlist");
          setTableData(response.data); // Assume `data` is an array of table rows
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  return (
    <div className="table-container">
    <table className="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>RAM</th>
          <th>Disk</th>
          <th>VCPUs</th>
        </tr>
      </thead>
      <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.ram}</td>
              <td>{item.disk}</td>
              <td>{item.extra_specs?.["resources:VGPU"] || 0}</td>
            </tr>
          ))}
        </tbody>
    </table>
  </div>
  );
};

export default Flavor;