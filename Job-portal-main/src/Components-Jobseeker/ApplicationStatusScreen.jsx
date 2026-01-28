import React, { useEffect } from "react";
import Success from "../assets/Success.png";
import { Footer } from "../Components-LandingPage/Footer";
import './ApplicationStatusScreen.css'
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../Components-LandingPage/Header";

export const ApplicationStatusScreen = () => {
  const { id } = useParams();
  const location = useLocation();
const navigate = useNavigate();
  
  const { jobId, companyId, jobData } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Job-portal-Live/jobseeker"); 
    }, 5000); 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-page">
      <Header/>

      <div className="success-container">
        <img
          src={Success}
          alt="Applied-successfully"
          className="success-image"
        />

        <h2 className="success-title">Congratulations!</h2>

        <p className="success-text">
          You have successfully applied to the{" "}
          <span className="job-title">
            {jobData?.title || "this job"}
          </span>{" "}
          position
        </p>
        <p style={{fontSize: '12px', color: 'gray', marginTop: '20px'}}>
          Redirecting to home in 3 seconds...
        </p>
      </div>

      <Footer />
    </div>
  );
}