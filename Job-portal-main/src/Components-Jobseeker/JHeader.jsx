// import {React,useState} from 'react'
// import './JHeader.css'
// import { Link,NavLink, useLocation } from 'react-router-dom';
// import breifcase from '../assets/header_case.png'
// import chat from '../assets/header_message.png'
// import bell from '../assets/header_bell.png'
// import bell_dot from '../assets/header_bell_dot.png'
// import { AvatarMenu } from './AvatarMenu';
// import profile from '../assets/header_profile.png'
// import { JNotification } from './JNotification';



import { useState } from 'react'
import './JHeader.css'
import { Link, NavLink, useLocation } from 'react-router-dom';
import breifcase from '../assets/header_case.png'
import chat from '../assets/header_message.png'
import bell from '../assets/header_bell.png'
import { JNotification } from './JNotification';
import bell_dot from '../assets/header_bell_dot.png'
import { AvatarMenu } from './AvatarMenu';
import home_icon from '../assets/header_bell.png'
import { notificationsData } from './Afterloginlanding';

//Remove after back end integration

export const JHeader = () => {
  const [showNotification, setShowNotification] = useState(false)
  const location = useLocation()
  const newNotificationsCount = notificationsData.filter(n => !n.isRead).length
 
  const NavLinks = [
    { name: 'Home', path: '/Job-portal-Live/jobseeker/' },
    { name: 'Jobs', path: '/Job-portal-Live/jobseeker/jobs' },
    { name: 'Companies', path: '/Job-portal-Live/jobseeker/companies' },
  ]
 
  return (
    <header className="header">
      <div className="logo">job portal</div>
 
      {/* Desktop text navigation */}
      <nav className="jheader-nav-links">
        {NavLinks.map(n => (
          <NavLink
            key={n.name}
            to={n.path}
            className={
              location.pathname === n.path
                ? 'jheader-nav-active'
                : 'jheader-nav-items'
            }
          >
            {n.name}
          </NavLink>
        ))}
      </nav>
 
      <div className="auth-links">
        <Link
          to="/Job-portal-Live/jobseeker/"
          className="nav-icons mobile-home-icon"
        >
          <img src={home_icon} className="jheader-icons" alt="Home" />
        </Link>
 
        <Link to="/Job-portal-Live/jobseeker/myjobs" className="nav-icons">
          <img src={breifcase} className="jheader-icons" alt="My Jobs" />
        </Link>
 
        <Link to="#" className="nav-icons">
          <img src={chat} className="jheader-icons" alt="Chat" />
        </Link>
 
        <div
          className="nav-icons"
          onClick={() => setShowNotification(!showNotification)}
        >
          <img
            src={newNotificationsCount > 0 ? bell_dot : bell}
            className="jheader-icons"
            alt="Notifications"
          />
        </div>
 
        <AvatarMenu />
      </div>
 
      <JNotification
        notificationsData={notificationsData}
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />
    </header>
  )
}