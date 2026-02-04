import React,{useState,useEffect} from 'react'
import { Header } from './Components-LandingPage/Header'
import { MainSection } from './Components-LandingPage/MainSection'
import { Works } from './Components-LandingPage/Works'
import { Joblisting } from './Components-LandingPage/Joblisting'
import { Topcompanies } from './Components-LandingPage/Topcompanies'
import { Choice } from './Components-LandingPage/Choice'
import { Newsletter } from './Components-LandingPage/Newsletter'
import { Footer } from './Components-LandingPage/Footer'
import './Landingpage.css'

const fetchData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000)); 
  return { success: true }; 
};

export const Landingpage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null); // Optional: to hold fetched data

  useEffect(() => {
    setIsLoading(true); // Ensure loading starts
    fetchData().then(fetchedData => {setData(fetchedData);})
    .catch(error => {console.error("Failed to fetch data:", error);})
    .finally(() => {setIsLoading(false);});
  }, []); 

  if (isLoading) {
    return (
    <div className="loading-container">
      <h1 >Job Portal</h1>
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>);
  }
  return (
    <>
    <Header />
      <MainSection />
      <Works />
      <Joblisting />
      <Topcompanies />
      <Choice />
      <Newsletter />
    <Footer />
    </>
  )
}
