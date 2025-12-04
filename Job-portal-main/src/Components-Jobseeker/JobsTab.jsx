import React, { useState } from 'react'
import './JobsTab.css'
import { Footer } from '../Components-LandingPage/Footer'
import { Link } from 'react-router-dom';
import breifcase from '../assets/header_case.png'
import chat from '../assets/header_message.png'
import bell from '../assets/header_bell.png'
import bell_dot from '../assets/header_bell_dot.png'
import profile from '../assets/header_profile.png'
import search from '../assets/icon_search.png'
import location from '../assets/icon_location.png'
import tick from '../assets/icon_tick.png'
import { JNotification } from './JNotification';
import { Joblist } from "../JobList";
import { OpportunitiesCard } from './OpportunitiesCard';
import { notificationsData } from './Afterloginlanding'; 
import { AvatarMenu } from './AvatarMenu';
import { JHeader } from './JHeader';

export const JobsTab = () => {
    const [showNotification, setShowNotification] = useState(false);
    const newNotificationsCount = notificationsData ? notificationsData.filter(n => n.isNew).length : 0;

    const displayCount = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const indexofLastjob = currentPage * displayCount;
    const indexoffirstjob = indexofLastjob - displayCount;

    const currentJobCards = Joblist.slice(indexoffirstjob, indexofLastjob);
    const totalpages = Math.ceil(Joblist.length / displayCount);

    const HandlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }
    const HandleNext = () => {
        if (currentPage < totalpages) setCurrentPage(currentPage + 1);
    }

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const siblingCount = 1; 

        if (totalpages <= 5) {
            for (let i = 1; i <= totalpages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);

            let startPage = Math.max(2, currentPage - siblingCount);
            let endPage = Math.min(totalpages - 1, currentPage + siblingCount);


            if (currentPage <= 3) {
                endPage = 4; 
            }
            
            if (currentPage >= totalpages - 2) {
                startPage = totalpages - 3; 
            }

            if (startPage > 2) {
                pageNumbers.push('...');
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (endPage < totalpages - 1) {
                pageNumbers.push('...');
            }

            pageNumbers.push(totalpages);
        }

        return pageNumbers.map((number, index) => {
            if (number === '...') {
                return <span key={`dots-${index}`} className="dots">...</span>;
            }
            return (
                <button
                    key={number}
                    className={`page-btn ${currentPage === number ? "active" : ""}`}
                    onClick={() => setCurrentPage(number)}>
                    {number}
                </button>
            );
        });
    };

    return (
        <>
            {/* <header className="header">
                <div className="logo">job portal</div>
                <nav className="nav-links">
                    <Link to="/Job-portal/jobseeker/" className="nav-item" >Home</Link>
                    <a href="#" className="nav-item nav-active" >Jobs</a>
                    <Link to="/Job-portal/jobseeker/companies" className="nav-item" >Companies</Link>
                </nav>

                <div className="auth-links">
                    <Link to="/Job-portal/jobseeker/myjobs"><img className='header-icons' src={breifcase} alt='My Jobs' /></Link>
                    <div><img className='header-icons' src={chat} alt='Messages' /></div>
                    <div onClick={() => setShowNotification(!showNotification)}><img className='header-icons' src={newNotificationsCount > 0 ? bell_dot : bell} alt='Notifications' /></div>
                    <AvatarMenu />
                </div>
                <JNotification notificationsData={notificationsData || []} showNotification={showNotification} setShowNotification={setShowNotification} />
            </header> */}
            <JHeader/>

            <div className='jobs-tab-search-bar'>
                <div className="search-bar">
                    <div className="search-field">
                        <span><img src={search} className="icon-size" alt="search_icon" /></span>
                        <input type="text" placeholder="Search by Skills, company or job title" />
                    </div>
                    <div className="separator"></div>

                    <div className="search-field">
                        <span><img src={location} className="icon-size" alt="location_icon" /></span>
                        <input type="text" placeholder="Enter Location" />
                    </div>
                    <div className="separator"></div>

                    <div className="search-field">
                        <span><img src={tick} className="icon-size" alt="search_tick" /></span>
                        <select defaultValue="" required>
                            <option value="" disabled hidden>Enter Experience</option>
                            <option value="fresher">Fresher</option>
                            <option value="1-3">1-3 Years</option>
                            <option value="3-5">3-5 Years</option>
                            <option value="5+">5+ Years</option>
                        </select>
                    </div>

                    <button className="search-button">Search</button>
                </div>
            </div>

            <section className='Opportunities-section'>
                <div className='Opportunities-section'>
                    <h2 className='Opportunities-title'>Jobs For You</h2>
                    <div className="Opportunities-job-list">
                        {currentJobCards.map((job, id) => (
                            <OpportunitiesCard key={id} job={job} />
                        ))}
                    </div>
                </div>
            </section>

            <div className="Navigation-job-Tab">
                <button 
                    onClick={HandlePrev} 
                    disabled={currentPage === 1} 
                    className='Navigation-btn'
                >
                    Previous
                </button>
                
                <div className="page-numbers">
                    {renderPageNumbers()}
                </div>
                
                <button 
                    onClick={HandleNext} 
                    disabled={currentPage === totalpages} 
                    className='Navigation-btn'
                >
                    Next
                </button>
            </div>

            <Footer />
        </>
    )
}