import React, { useState, useEffect } from "react";
import axiosInstance from '../../utils/axiosconfig';

const Network = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/getnetworklist");
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
          <th>Subnet</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                {item.subnets && Array.isArray(item.subnets)
                  ? item.subnets.join(",")
                  : item.subnets}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  );
};
export default Network;