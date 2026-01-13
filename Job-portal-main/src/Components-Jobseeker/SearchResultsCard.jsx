import React from 'react';
import AppleLogo from '../assets/Apple-Logo.png'
import time from '../assets/opportunity_time.png'
import experience from '../assets/opportunity_bag.png'
import place from '../assets/opportunity_location.png'
import formatPostedDate from './OpportunitiesCard';
import "./SearchResultsCard.css"
import { Joblist } from '../JobList';
import { useNavigate } from 'react-router-dom';



function SearchResultsCard(props) {
    const { job } = props;
    const navigate = useNavigate();

    const logoContent = job.logo ? (<img src={job.logo} alt={job.company} className="SearchResults-job-card-job-logo" />) : (<div className="SearchResults-job-card-logo-placeholder">{job.company.charAt(0).toUpperCase()}</div>)
    const HandleClick = () => {
        navigate(`/Job-portal-Live/jobseeker/OpportunityOverview/${job.id}`)
    }
    return (


        <div className="SearchResults-job-card">
            <div onClick={HandleClick} className="SearchResults-job-card-header">
                <div>
                    <h3 className="SearchResults-job-card-title">{job.title}</h3>
                    <p className="SearchResults-job-card-company">{job.ratings}</p>
                </div>
                {logoContent}
            </div>

            <div className="SearchResults-job-card-details">
                <p className='SearchResults-job-card-detail-line'><img src={time} className='SearchResults-job-card-icons' />{job.duration}
                    <span className="SearchResults-job-card-divider">|</span>₹ {job.salary} Lpa
                    <span className="SearchResults-job-card-divider">|</span><img src={experience} className='SearchResults-job-card-icons' /> {job.experience} year of experience
                    <span className="SearchResults-job-card-divider">|</span><img src={place} className='SearchResults-job-card-icons' />{job.location}</p>
                <p className='SearchResults-job-card-detail-line'><img src={time} className='SearchResults-job-card-icons' />shift : {job.Shift}
                    <span className="SearchResults-job-card-divider">|</span><img src={experience} className='SearchResults-job-card-icons' /> {job.EducationRequired}
                </p>
                {/* <p className='SearchResults-job-card-detail-line'><img src={experience} className='SearchResults-job-card-icons'/>{job.Responsibilities[0]}</p> */}
            </div>

            <hr className="SearchResults-job-card-separator" />

            <div className="SearchResults-job-card-job-footer">
                <div className="SearchResults-job-card-job-meta">
                    <p>{formatPostedDate(job.posted)} <span className="SearchResults-job-card-divider">|</span> Openings: {job.openings}    <span className="SearchResults-job-card-divider">|</span> Applicants: {job.applicants}</p>
                </div>

                <div className="SearchResults-job-card-actions">
                    <button className="SearchResults-job-card-save-btn">Save</button>
                    <button className="SearchResults-job-card-apply-btn">Apply</button>
                </div>
            </div>
        </div>

    )
}

export default SearchResultsCard