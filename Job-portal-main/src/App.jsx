import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Landingpage } from './Landingpage'
import { Elogin } from './Components-EmployerSignup/Elogin'
import { Jlogin } from './Components-JobseekerSignup/Jlogin'
import { Jsignup } from './Components-JobseekerSignup/Jsignup'
import { Jcreatepassword } from './Components-JobseekerSignup/Jcreatepassword'
import { Jforgotpassword } from './Components-JobseekerSignup/Jforgotpassword'
import { Afterloginlanding } from './Components-Jobseeker/Afterloginlanding'
import { ESignup } from './Components-EmployerSignup/ESignup'
import { Eforgotpassword } from './Components-EmployerSignup/Eforgotpassword'
import { Ecreatepassword } from './Components-EmployerSignup/Ecreatepassword'
import { OpportunityOverview } from './Components-Jobseeker/OpportunityOverview'
import { MyJobs } from './Components-Jobseeker/MyJobs'
import { JobsTab } from './Components-Jobseeker/JobsTab'
import { CompaniesTab } from './Components-Jobseeker/CompaniesTab'
import { MyProfile } from './Components-Jobseeker/MyProfile'
import { JobsThroughCompany } from './Components-Jobseeker/JobsThroughCompany'
import { SearchResultsPage } from './Components-Jobseeker/SearchResultsPage'
import Aboutus from './Components-LandingPage/Aboutus'
import { JobProvider } from './Components-Jobseeker/Jobcontext'
import {AppliedJobsOverview} from './Components-Jobseeker/AppliedJobsOverview'
import { JobApplication } from './Components-Jobseeker/JobApplication'
import { ApplicationStatusScreen } from './Components-Jobseeker/ApplicationStatusScreen'
import { Revoked } from './Components-Jobseeker/Revoked'
import SettingsPage from './Components-Jobseeker/Settings'
import { ContactUs } from './Components-Jobseeker/ContactUs'
import { FAQ } from './Components-Jobseeker/FAQ'
import Blogpage from './Components-Jobseeker/BlogPage'
import BlogCategory from './Components-Jobseeker/BlogCategory'
import { TechnologyBlog } from './Components-Jobseeker/TechnologyBlog'
import { EmployerDashboard } from './Components-Employer/EmployerDashboard'
import { HelpCenter } from './Components-Jobseeker/HelpCenter'
import { ProfileCreationHelp } from './Components-Jobseeker/ProfileCreationHelp'
import { RaiseTicket } from './Components-Jobseeker/RaiseTicket'
import { LiveChat } from './Components-Jobseeker/LiveChat'
import { ResumeUploadHelp } from './Components-Jobseeker/ResumeUploadhelp'
import { JobApplyIssuesHelp } from './Components-Jobseeker/JobApplyIssuesHelp'
import { InterviewSchedulingHelp } from './Components-Jobseeker/InterviewSchedulingHelp'
import { JobPostingHelp } from './Components-Jobseeker/JobPostingHelp'
import { CandidateSearchHelp } from './Components-Jobseeker/CandidateSearchHelp'
import { SubscriptionIssuesHelp } from './Components-Jobseeker/SubscriptionIssuesHelp'
import { InvoicePaymentHelp } from './Components-Jobseeker/InvoicePaymentHelp'
import { LoginIssuesHelp } from './Components-Jobseeker/LoginIssuesHelp'
import { PageErrorsHelp } from './Components-Jobseeker/PageErrorsHelp'
import { FileUploadHelp } from './Components-Jobseeker/FileUploadHelp'



const router = createBrowserRouter([
  {
  path: '/Job-portal-Live',
  element: <Landingpage />,
},
{
  path: '/Job-portal-Live/jobseeker/login',
  element: <Jlogin />,
},
{
  path: '/Job-portal-Live/jobseeker/login/forgotpassword',
  element: <Jforgotpassword />,
},
{
  path: '/Job-portal-Live/jobseeker/signup',
  element: <Jsignup />,
},
{
  path: '/Job-portal-Live/jobseeker/login/forgotpassword/createpassword',
  element: <Jcreatepassword />,
},
{
  path: '/Job-portal-Live/jobseeker/',
  element: <Afterloginlanding />,
},
{
  path: '/Job-portal-Live/employer/login',
  element: <Elogin />,
},
{
  path: '/Job-portal-Live/employer/signup',
  element: <ESignup />,
},
{
  path: '/Job-portal-Live/employer/login/forgotpassword',
  element: <Eforgotpassword />,
},
{
  path: '/Job-portal-Live/employer/login/forgotpassword/createpassword',
  element: <Ecreatepassword />,
},
{
  path: '/Job-portal-Live/jobseeker/OpportunityOverview/:id',
  element: <OpportunityOverview />,
},
{
  path: '/Job-portal-Live/jobseeker/myjobs',
  element: <MyJobs />,
},
{
  path: '/Job-portal-Live/jobseeker/jobs',
  element: <JobsTab />,
},
{
  path: '/Job-portal-Live/jobseeker/companies',
  element: <CompaniesTab />,
},
{
  path: '/Job-portal-Live/jobseeker/myprofile',
  element: <MyProfile />,
},
{
  path: '/Job-portal-Live/jobseeker/companies/:companyId',
  element: <JobsThroughCompany />,
},
{
  path: '/Job-portal-Live/jobseeker/searchresults',
  element: <SearchResultsPage/>
},
{
  path: '/Job-portal-Live/jobseeker/help-center',
  element: <HelpCenter />,
},
{
  path: '/Job-portal-Live/jobseeker/help-center/raise-a-ticket',
  element: <RaiseTicket />,
},
{
  path: '/Job-portal-Live/jobseeker/help-center/help-FAQs',
  element: <FAQ />,
},
{
  path:'/Job-portal-Live/jobseeker/help-center/live-chat',
  element: <LiveChat />,
},
{
  path:'/Job-portal-Live/jobseeker/help-center/profile-creation-help',
  element: <ProfileCreationHelp />,
},
{
  path:'/Job-portal-Live/jobseeker/help-center/resume-upload-help',
  element: <ResumeUploadHelp />,
},
{
  path:'/Job-portal-Live/jobseeker/help-center/job-apply-help',
  element: <JobApplyIssuesHelp />,
},
{
  path:'/Job-portal-Live/jobseeker/help-center/interview-scheduling-help',
  element: <InterviewSchedulingHelp />,
},
{
  path:'/Job-portal-Live/jobseeker/help-center/job-posting-help',
  element: <JobPostingHelp />,
},
{
  path:'/Job-portal-Live/jobseeker/help-center/candidate-search-help',
  element: <CandidateSearchHelp />,
},
{
  path:'/Job-portal-Live/jobseeker/help-center/subscription-issue-help',
  element: <SubscriptionIssuesHelp />,
},
{
  path:'/Job-portal-Live/jobseeker/help-center/invoice-payment-help',
  element: <InvoicePaymentHelp />,
},
{
  path:'/Job-portal-Live/jobseeker/help-center/login-issue-help',
  element: <LoginIssuesHelp />,
},
{
  path:'/Job-portal-Live/jobseeker/help-center/page-error-help',
  element: <PageErrorsHelp />,
},
{
  path:'/Job-portal-Live/jobseeker/help-center/file-upload-help',
  element: <FileUploadHelp />,
},
{
  path: '/Job-portal-Live/jobseeker/about_us',
  element: <Aboutus/>
},
{
  path: '/Job-portal-Live/jobseeker/ApplicationReview/:id',
  element: <JobApplication/>
},
{
  path: '/Job-portal-Live/jobseeker/AppliedJobsOverview/:id',
  element: <AppliedJobsOverview/>
},
{
  path: '/Job-portal-Live/jobseeker/AppliedJobsOverview/:id',
  element: <AppliedJobsOverview/>
},
{
  path: '/Job-portal-Live/jobseeker/Submitted/:id',
  element: <ApplicationStatusScreen/>
},
{
  path: '/Job-portal-Live/jobseeker/Withdrawn',
  element: <Revoked/>
},
{
  path: '/Job-portal-Live/jobseeker/Settings',
  element: <SettingsPage/>
},
{
  path: '/Job-portal-Live/jobseeker/Contact_us',
  element: <ContactUs/>
},
{
  path: '/Job-portal-Live/jobseeker/FAQ',
  element: <FAQ/>
},
{
  path: '/Job-portal-Live/jobseeker/Blogs',
  element: <Blogpage/>
},
{
  path: '/Job-portal-Live/jobseeker/Blogs/Category',
  element: <BlogCategory/>
},
{
  path: '/Job-portal-Live/jobseeker/Blogs/Technology',
  element: <TechnologyBlog/>
},
{
  path: '/Job-portal-Live/Employer/Dashboard',
  element: <EmployerDashboard/>
},
])

function App() {
  return (
    <JobProvider>
      <RouterProvider router={router} />
    </JobProvider>
  )
}

export default App
