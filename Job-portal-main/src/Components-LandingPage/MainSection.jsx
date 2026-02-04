import React from 'react'
import './MainSection.css'
import search from '../assets/icon_search.png'
import location from '../assets/icon_location.png'
import tick from '../assets/icon_tick.png'
import SearchBar from '../Components-Jobseeker/Searchbar'

export const MainSection = () => {
  return (
    <>
    <main className="main-section">
      <h1 className="headline">"Your Dream Job Is Just A Click Away"</h1>
      <p className="subheading">Explore 5 Lakh+ Openings Now</p>
      <SearchBar/>
    </main>
    </>
  )
}
