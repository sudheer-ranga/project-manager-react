import React from "react";
import Columns from "./../../Components/Columns";
import "./Dashboard.scss";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  let { id } = useParams();

  return (
    <div className="container">
      <Columns boardId={id} />
    </div>
  );
};

export default Dashboard;
