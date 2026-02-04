import React, { useState } from 'react'
import './Afterloginlanding.css'
import { Header } from '../Components-LandingPage/Header';
import { JMainsection } from './JMainsection';
import { Jobsbycompany } from './Jobsbycompany';
import { Opportunities } from './Opportunities';
import { Footer } from '../Components-LandingPage/Footer';
import { useNavigate } from "react-router-dom";
 
const notificationsData = [
    {
        id: 1,
        text: 'Recruiter viewed your profile',
        time: 'Today, 10:45 am',
        isNew: true,
    },
    {
        id: 2,
        text: 'You have an interview invitation from XYZ Pvt Ltd',
        time: 'Yesterday, 4:20 pm',
        isNew: true,
    },
    {
        id: 3,
        text: 'Application submitted successfully for UI/UX Designer',
        time: 'Yesterday, 4:20 pm',
        isNew: false,
    },
    {
        id: 4,
        text: 'Your profile is 90% complete — finish to get more calls',
        time: 'Yesterday, 4:20 pm',
        isNew: false,
    },
    {
        id: 5,
        text: '5 new jobs match your preferences',
        time: '17 Aug 2025, 9:30 am',
        isNew: false,
    },
    {
        id: 6,
        text: '5 new jobs match your preferences',
        time: '17 Aug 2025, 9:30 am',
        isNew: false,
    },
];
export { notificationsData };
export const Afterloginlanding = () => {
    const navigate = useNavigate();
   
 
    return (
        <>
            <Header/>
            <JMainsection />
            <section className='Opportunities-section'>
                <h2 className='Opportunities-title'>Opportunities Just For You</h2>
                <Opportunities />
                <button onClick={() => navigate('/Job-portal-live/jobseeker/jobs')} className="Opportunities-view-more-btn">View More</button>
            </section>
            <Jobsbycompany />
            <Footer />
        </>
    )
}