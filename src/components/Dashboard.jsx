import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const firstName = localStorage.getItem("firstName") || "";
  const lastName = localStorage.getItem("lastName") || "";
  const navigate = useNavigate();

  const handleNeetPg = () => navigate("/Body", { replace: true });
  const handleNeetSs = () => navigate("/Body1", { replace: true });

  return (
    <div className='main'>
      <h2>WELCOME TO Dashboard {firstName} {lastName}</h2>
      <p>Please Select your course</p>
      <div className='btn'>
        <button onClick={handleNeetPg}>NEET PG</button>
        <button onClick={handleNeetSs}>NEET SS</button>
      </div>
    </div>
  );
};

export default Dashboard;
