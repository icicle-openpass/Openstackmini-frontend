import React, { useState, useEffect } from "react";
import axiosInstance from '../../utils/axiosconfig';

const Images = () => {
  // State to store the data fetched from the API
  const [tableData, setTableData] = useState([]);

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/getimagelist");
        setTableData(response.data);
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
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
      {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.status}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  );
};

export default Images;