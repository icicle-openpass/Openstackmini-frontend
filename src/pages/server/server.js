import React, { useState, useEffect } from "react";
import "./server.css";
import axiosInstance from '../../utils/axiosconfig';

const Server = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/getserverlist");
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!tableData) {
    return <div>Loading...</div>;
  }else{
    return <>
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Image</th>
            <th>Flavor</th>
          </tr>
        </thead>
        <tbody>
        {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.status}</td>
              <td>{item.image}</td>
              <td>{item.flavor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  }
};

export default Server;