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

const router = createBrowserRouter([
  {
  path: '/Job-portal-Live',
  element: <Landingpage />,
},
{
  path: '/Job-portal/jobseeker/login',
  element: <Jlogin />,
},
{
  path: '/Job-portal/jobseeker/login/forgotpassword',
  element: <Jforgotpassword />,
},
{
  path: '/Job-portal/jobseeker/signup',
  element: <Jsignup />,
},
{
  path: '/Job-portal/jobseeker/login/forgotpassword/createpassword',
  element: <Jcreatepassword />,
},
{
  path: '/Job-portal/jobseeker/',
  element: <Afterloginlanding />,
},
{
  path: '/Job-portal/employer/login',
  element: <Elogin />,
},
{
  path: '/Job-portal/employer/signup',
  element: <ESignup />,
},
{
  path: '/Job-portal/employer/login/forgotpassword',
  element: <Eforgotpassword />,
},
{
  path: '/Job-portal/employer/login/forgotpassword/createpassword',
  element: <Ecreatepassword />,
},
{
  path: '/Job-portal/jobseeker/OpportunityOverview/:id',
  element: <OpportunityOverview />,
},
{
  path: '/Job-portal/jobseeker/myjobs',
  element: <MyJobs />,
},
{
  path: '/Job-portal/jobseeker/jobs',
  element: <JobsTab />,
},
{
  path: '/Job-portal/jobseeker/companies',
  element: <CompaniesTab />,
},
{
  path: '/Job-portal/jobseeker/myprofile',
  element: <MyProfile />,
},
{
  path: '/Job-portal/jobseeker/companies/:companyId',
  element: <JobsThroughCompany />,
}])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
