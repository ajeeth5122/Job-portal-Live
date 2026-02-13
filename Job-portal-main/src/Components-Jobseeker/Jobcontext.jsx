import React, { createContext, useState, useContext } from 'react';
import { Joblist } from '../JobList';
 
const JobContext = createContext();
 
export const JobProvider = ({ children }) => {
 
    const [jobs, setJobs] = useState(Joblist);
    const [onlineStatus, setOnlineStatus] = useState("yes");
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [chats, setChats] = useState([
            {
                id: 1,
                name: "Ajeeth A",
                status: "online",
                messages: [{ id: 1, text: "Welcome to Job Portal Messenger!", sender: "friend", time: "10:30 AM" }],
                pendingData: [
                    "Hi! I came across your profile...",
                    "We currently have an opening...",
                    "That's great! Remote or Relocation?"
                ]
            },
            {
                id: 2,
                name: "Harsha A",
                status: "online",
                messages: [{ id: 1, text: "Hey, are you free for a call?", sender: "friend", time: "11:11 AM" }],
                pendingData: ["I saw your portfolio.", "Can we discuss the salary?"]
            },
            {
                id: 3,
                name: "SuryaKumar R",
                status: "offline",
                messages: [{ id: 1, text: "Referral update: Sent!", sender: "friend", time: "09:00 AM" }],
                pendingData: ["Check your mail."]
            },
            {
                id: 4,
                name: "ThomasAntony p",
                status: "away",
                messages: [{ id: 1, text: "Hey There", sender: "friend", time: "08:00 AM" }],
                pendingData: []
            },
            {
                id: 5,
                name: "Naveen",
                status: "Online",
                messages: [{ id: 1, text: "is any designs needed please feel free to reachout..", sender: "friend", time: "12:00 PM" }],
                pendingData: []
            },
        ]);
         const [activeChatId, setActiveChatId] = useState(1);

         
 
    const getFormattedDate = () => {
        return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    };
 
    const isJobSaved = (jobId) => savedJobs.some((j) => j.id === jobId);
 
    const applyForJob = (originalJob) => {
        const newAppliedJob = {
            ...originalJob,
            appliedDate: `Applied on ${getFormattedDate()}`,
            
            status: { text: 'Hiring in Progress', type: 'progress' },
            // other 2 options for Status:
            // status= {text: 'Reviewing Application', type: 'reviewing'},
            // status= {text: 'Hiring Done', type: 'done'},
            
            applicationStatus: [
 
                { label: 'Application Submitted', sub: "Your profile, resume, and cover letter have successfully entered the company's database, and an acknowledgment has been sent.", status: 'completed' },
 
                { label: 'Resume Screening', sub: "Your resume is currently being reviewed (either by an automated system or a screener) to ensure your skills and qualifications match the core job requirements.", status: 'pending' },
 
                { label: 'Recruiter Review', sub: "A hiring manager manually reviews your specific experience, portfolio, and background to determine potential fit for the role.", status: 'pending' },
 
                { label: 'Shortlisted', sub: "You have passed the initial review stages and have been flagged as a top contender among the applicant pool.", status: 'pending' },
 
                { label: 'Interview Called', sub: "The hiring team has officially reached out to schedule a meeting, moving your status from 'Review' to active 'Engagement.'", status: 'pending' },
 
            ]
        };
 
        setAppliedJobs((prev) => [...prev, newAppliedJob]);
        setJobs((prev) => prev.filter((j) => j.id !== originalJob.id));
        setSavedJobs((prev) => prev.filter((j) => j.id !== originalJob.id));
 
        alert(`Successfully applied to ${originalJob.title} at ${originalJob.company}!`);
    };
 
    
 
    const toggleSaveJob = (originalJob) => {
        if (isJobSaved(originalJob.id)) {
            setSavedJobs((prev) => prev.filter((j) => j.id !== originalJob.id));
        } else {
            const newSavedJob = {
                ...originalJob,
                savedDate: `Saved on ${getFormattedDate()}`
            };
            setSavedJobs((prev) => [...prev, newSavedJob]);
        }
    };
 
    return (
        <JobContext.Provider value={{
            jobs,
            appliedJobs,
            savedJobs,
            applyForJob,
            toggleSaveJob,
            isJobSaved,
            setJobs,
            setAppliedJobs,
            chats,
            setChats,
            onlineStatus, 
            setOnlineStatus,
            activeChatId,
            setActiveChatId
        }}>
            {children}
        </JobContext.Provider>
    );
};
 
export const useJobs = () => useContext(JobContext);