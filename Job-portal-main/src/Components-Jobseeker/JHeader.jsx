import {React,useState} from 'react'
import './JHeader.css'
import { Link,NavLink, useLocation } from 'react-router-dom';
import breifcase from '../assets/header_case.png'
import chat from '../assets/header_message.png'
import bell from '../assets/header_bell.png'
import bell_dot from '../assets/header_bell_dot.png'
import { AvatarMenu } from './AvatarMenu';
import profile from '../assets/header_profile.png'
import { JNotification } from './JNotification';
import { notificationsData } from './Afterloginlanding';


export const JHeader = () => {
    // const [activeItem, setActiveItem] = useState();
    const Location = useLocation();
        const NavLinks = [
            { name: 'Home', path: '/Job-portal-Live/jobseeker' },
            { name: 'Jobs', path: '/Job-portal-Live/jobseeker/jobs' },
            { name: 'Companies', path: '/Job-portal-Live/jobseeker/companies'},
        ];
        const NavIcons =[
            {image: breifcase, path: "/Job-portal-Live/jobseeker/myjobs"},
            {image: chat , path: ""}
        ]
    const [showNotification, setShowNotification] = useState(false);
    const newNotificationsCount = notificationsData ? notificationsData.filter(n => n.isNew).length : 0;
        
    return (
       <header className="header">
                <div className="logo">job portal</div>
                <nav className="nav-links">
                    {NavLinks.map((n)=>{
                    let isActive = Location.pathname===n.path 
                   if (n.name === 'Home' && !isActive) {
                    isActive = location.pathname === n.path + '/';
                    }
                    return(
                    <NavLink key={n.name} to={n.path} className={ isActive ? 'jheader-nav-active' : 'jheader-nav-items'}>{n.name}</NavLink >)})}
                    {/* <Link to="/Job-portal-Live/jobseeker/" className="nav-item" >Home</Link>
                    <a href="#" className="nav-item nav-active" >Jobs</a>
                    <Link to="/Job-portal-Live/jobseeker/companies" className="nav-item" >Companies</Link> */}
                </nav>

                <div className="auth-links">
                     {NavIcons.map((IC,index)=>{
                                    let isActive = Location.pathname ==IC.path
                                    return(
                                    <Link key={index} className='nav-icons' to={IC.path}><img className={ isActive? 'jheader-icons-active' : 'jheader-icons'} src={IC.image} alt='My Jobs' /></Link>)})}
                                                        
                     {/*<Link to="/Job-portal-Live/jobseeker/myjobs"><img className='jheader-icons' src={breifcase} alt='My Jobs' /></Link>
                    <div><img className='jheader-icons' src={chat} alt='Messages' /></div> */}
                    <div onClick={() => setShowNotification(!showNotification)}><img className='jheader-icons' src={newNotificationsCount > 0 ? bell_dot : bell} alt='Notifications' /></div>
                    <AvatarMenu />
                </div>
                <JNotification notificationsData={notificationsData || []} showNotification={showNotification} setShowNotification={setShowNotification} />
            </header>
    )
}
