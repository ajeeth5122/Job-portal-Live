import React, { useState } from 'react'
import './CompaniesTab.css'
import { useNavigate } from "react-router-dom";
import { Footer } from '../Components-LandingPage/Footer';
import breifcase from '../assets/header_case.png'
import chat from '../assets/header_message.png'
import bell from '../assets/header_bell.png'
import bell_dot from '../assets/header_bell_dot.png'
import profile from '../assets/header_profile.png'
import search from '../assets/icon_search.png'
import location from '../assets/icon_location.png'
import tick from '../assets/icon_tick.png'
import Apple from '../assets/Apple-Logo.png'
import Wipro from '../assets/WIT.png'
import CTS from '../assets/CTSH_BIG.png'
import Amazon from '../assets/AMZN_BIG.png'
import Google from '../assets/GOOG.png'
import Infy from '../assets/INFY_BIG.png'
import Tcs from '../assets/TCS.png'
import META from '../assets/META_BIG.png'
import starIcon from '../assets/Star_icon.png'
import { notificationsData } from './Afterloginlanding';
import { JNotification } from './JNotification';
import { CompaniesList } from '../CompaniesList';
import { AvatarMenu } from './AvatarMenu';
import { JHeader } from './JHeader';
import { Header } from '../Components-LandingPage/Header';

/* Below Code is removed after backend integration*/
const companiesList = CompaniesList.slice(0,8)

export const CompaniesTab = () => {
  const navigate = useNavigate();
  // const [showNotification, setShowNotification] = useState(false);
  // const newNotificationsCount = notificationsData.filter(n => n.isNew).length;

  return (
    <>
      {/* <header className="header">
        <div className="logo">job portal</div>
        <nav className="nav-links">
          <Link to="/Job-portal/jobseeker/" className="nav-item" >Home</Link>
          <Link to="/Job-portal/jobseeker/jobs" className="nav-item" >Jobs</Link>
          <a href="#" className="nav-item nav-active">Companies</a>
        </nav>

        <div className="auth-links">
          <Link to="/Job-portal/jobseeker/myjobs"><img className='header-icons' src={breifcase} alt='My Jobs' /></Link>
          <div><img className='header-icons' src={chat} alt='Messages' /></div>
          <div onClick={() => setShowNotification(!showNotification)}><img className='header-icons' src={newNotificationsCount > 0 ? bell_dot: bell} alt='Notifications' /></div>
          <AvatarMenu />
        </div>
        <JNotification notificationsData={notificationsData} showNotification={showNotification} setShowNotification={setShowNotification} />
      </header> */}
      <Header/>
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

      <div className="companies-tab-container">
        <h2 className="carousel-title">Companies for you</h2>
        <div className="companies-tab-grid">
          {companiesList.map((company) => (
            <div key={company.companyId} className="companies-tab-card">
              <div className="companies-tab-logo-container">
                <img src={company.logo} alt={`${company.companyName} logo`} className="companies-tab-logo" />
              </div>
              <h3 className="companies-tab-name">{company.companyName}</h3>
              <div className="companies-tab-rating-reviews">
                <span className="star companies-tab-rating-star"><img src={starIcon} /></span>
                <span className="companies-tab-rating">{company.ratings}</span>
                <span className="companies-tab-separator">|</span>
                <span className="companies-tab-reviews">{company.reviewNo} reviews</span>
              </div>
              <p className="companies-tab-desc">{company.slogan}</p>
              <button className="companies-tab-view-jobs-btn" onClick={()=>navigate(`/Job-portal-Live/jobseeker/companies/${company.companyId}`)}>View Jobs</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
