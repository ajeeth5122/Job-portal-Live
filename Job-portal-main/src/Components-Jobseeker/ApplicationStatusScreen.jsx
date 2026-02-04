import React, { useEffect } from "react";
import Success from "../assets/Success.png";
import { Footer } from "../Components-LandingPage/Footer";
import './ApplicationStatusScreen.css';
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../Components-LandingPage/Header";
import { Joblist } from "../JobList";
import { useJobs } from "./Jobcontext";

export const ApplicationStatusScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appliedJobs } = useJobs();

  const job = appliedJobs.find((j) => j.id === id) || Joblist.find((j) => j.id === id);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Job-portal-Live/jobseeker");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-page">
      <Header />
      <div className="success-container">
        <img src={Success} alt="Success" className="success-image" />
        <h2 className="success-title">Congratulations!</h2>

        <p className="success-text">
          You have successfully applied to the 
          <strong> {job?.title || "selected"} </strong> position.
        </p>

        <p style={{ fontSize: '12px', color: 'gray', marginTop: '20px' }}>
          Redirecting to home in 3 seconds...
        </p>
      </div>
      <Footer />
    </div>
  );
};