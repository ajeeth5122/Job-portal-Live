import { useEffect, useState, useMemo } from 'react'
import { JHeader } from './JHeader'
import './SearchResultsPage.css'
import { Joblist } from '../JobList'
import SearchResultsCard from './SearchResultsCard'
import { Footer } from '../Components-LandingPage/Footer'
import { useLocation } from 'react-router-dom'
import SearchBar from './Searchbar'

 

const SearchResultsPage = () => {

  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(100);
  const [Exp, SetExp] = useState(30);
  const location = useLocation();
  
  
const getPercent = (value) => Math.round(((value - 0) / (100 - 0)) * 100);

 
const countPropertyOccurrences = (data, property) => {
  return data.reduce((acc, item) => {
    const value = item[property];
    // Create a safe key: lowercase the value or use a fallback
    const key = value ? value.toLowerCase() : `Unknown ${property}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
};
 const formatPostedDate = (dateString)=>{
    const postedDate = new Date(dateString);
    const today = new Date();
 
    const diffInMs = today - postedDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
 
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays > 1 && diffInDays <= 7)  return `${diffInDays} days ago`;
    if (diffInDays > 8 && diffInDays <= 14)  return `1 Week ago`;
    if (diffInDays > 15 && diffInDays <= 21)  return `2 Week ago`;
    if (diffInDays > 22 && diffInDays <= 29)  return `3 Week ago`;
    if (diffInDays > 30 && diffInDays <= 60) return `1 month ago`;
   
     return `Long ago`;
   
  }
 
const countPostedDate = (data, property) => {
  return data.reduce((acc, item) => {
    const value = item[property];
    // Create a safe key: lowercase the value or use a fallback
    const key = value ? formatPostedDate(value) : `Unknown ${property}`;
   
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
};
 
const educationCounts = Joblist.reduce((acc, item) => {
  item.EducationRequired.forEach((edu )=> {
    // Normalize to lowercase to avoid "MBA" vs "mba" issues
    const degree = edu.toLowerCase();
    acc[degree] = (acc[degree] || 0) + 1;
  });
  return acc;
}, {});
 
const InduntryCounts = Joblist.reduce((acc, item) => {
  item.IndustryType.forEach((int )=> {
    // Normalize to lowercase to avoid "MBA" vs "mba" issues
    const degree = int.toLowerCase();
    acc[degree] = (acc[degree] || 0) + 1;
  });
  return acc;
}, {});
 
 
 
// Usage:
  const locationCounts = countPropertyOccurrences(Joblist, 'location');
  const workTypeCounts = countPropertyOccurrences(Joblist, 'WorkType');
  const PostedbyCounts = countPropertyOccurrences(Joblist,'PostedBy')
  const CompanyCounts = countPropertyOccurrences(Joblist,'company');
  const PostedDtCounts = countPostedDate(Joblist,'posted')
 
 
 
 
// Convert to arrays if needed for charts or UI components
  const locationArray = Object.entries(locationCounts);
  const WorkTypeArray = Object.entries(workTypeCounts);
  const PostedbyArray = Object.entries(PostedbyCounts);
  const TopcompanyArray = Object.entries(CompanyCounts);
  const checkboxList = Object.entries(educationCounts);
  const PostedDateArray = Object.entries(PostedDtCounts);
  const IndustryType = Object.entries(InduntryCounts);
 
 
 
  const [locationFilters, setLocationFilters] = useState(locationArray.slice(0,5));
  const [workTypeFilters, setWorkTypeFilters] = useState(WorkTypeArray);
  const [PostedbyFilter, setPostedbyFilter] = useState(PostedbyArray);
  const [CompanyFilter, setCompanyFilter] = useState(TopcompanyArray.slice(0,5));
  const [EducationFilter, setEducationFilter] = useState(checkboxList.slice(0,5));
  const [PostedDateFilter, setPostedDateFilter] = useState(PostedDateArray);
  const [IndustryTypeFilter, setIndustryTypeFilter] = useState(IndustryType.slice(0,5));
 
 
 
  const [TopCompanyExpanded, setTopCompanyExpanded] = useState(false);
  const [LocationExpanded, setLocationExpanded] = useState(false);
  const [IndustryTypeExpanded, setIndustryTypeExpanded] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState(location.state?.query || "");
  const [searchLocation, setSearchLocation] = useState(location.state?.location || "");
  const [searchExp, setSearchExp] = useState(location.state?.experience || "");

  
  const [appliedFilters, setAppliedFilters] = useState({
  query: location.state?.query || "",
  location: location.state?.location || "",
  experience: location.state?.experience || ""
});


const handleSearchButtonClick = () => {
  setAppliedFilters({
    query: searchQuery,
    location: searchLocation,
    experience: searchExp
  });
  console.log(searchQuery)
};
 
 
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedWorkType, setselectedWorkType] = useState([]);
  const [SelectedPostedby, setSelectedPostedby] = useState([]);
  const [SelectedCompany, setSelectedCompany] = useState([]);
  const [SelectedEducation, setSelectedEducation] = useState([]);
  const [SelectedPostDate, setSelectedPostDate] = useState([]);
  const [SelectedIndustryType, setSelectedIndustryType] = useState([]);  
 
  const HandleClear=()=>{
    setSelectedLocations([]);
    setselectedWorkType([]);
    setSelectedPostedby([]);
    setSelectedCompany([]);
    setSelectedEducation([]);
    setSelectedPostDate([]);
    setSelectedIndustryType([]);
    setMinVal(0);
    setMaxVal(100);
    SetExp(30)
  }
  const handleSort = (type) => {
    setSortBy(type);
    setOpenSort(false);
  }
 
 
  const handleLocationViewMore = () => {
    if (LocationExpanded) {setLocationFilters(locationArray.slice(0, 5));}
    else {setLocationFilters(locationArray)} setLocationExpanded(!LocationExpanded);
  }
  const handleCompanyViewMore = () => {
    if (TopCompanyExpanded) {setCompanyFilter(TopcompanyArray.slice(0, 5));}
    else {setCompanyFilter(TopcompanyArray)} setTopCompanyExpanded(!TopCompanyExpanded);
  }
  const handleIndustryViewMore = () => {
    if (IndustryTypeExpanded) {setIndustryTypeFilter(IndustryType.slice(0, 5));}
    else {setIndustryTypeFilter(IndustryType)} setIndustryTypeExpanded(!IndustryTypeExpanded);
  }
 
 
  const handleLocationChange = (event) => {
    const location = event.target.value;
    const isChecked = event.target.checked;
 
    setSelectedLocations(prevLocations => {
      if (isChecked) {
        return [...prevLocations, location];
      } else {
       
        return prevLocations.filter(loc => loc !== location);
      }
    });
  };
  const HandleWorkType = (event) => {
    const WorkType = event.target.value;
    const isChecked = event.target.checked;
 
    setselectedWorkType(prevWorkType => {
      if (isChecked) {
       
        return [...prevWorkType, WorkType];
      } else {
       
        return prevWorkType.filter(work => work !== WorkType);
      }
    });
  };
  const HandlePostedby = (event) => {
    const postedby = event.target.value;
    const isChecked = event.target.checked;
 
    setSelectedPostedby(prevpostedby => {
      if (isChecked) {
       
        return [...prevpostedby, postedby];
      } else {
       
        return prevpostedby.filter(post => post !== postedby);
      }
    });
  };
  const HandleCompany = (event) => {
    const Company = event.target.value;
    const isChecked = event.target.checked;
 
    setSelectedCompany(prevCompany => {
      if (isChecked) {
       
        return [...prevCompany, Company];
      } else {
       
        return prevCompany.filter(com => com !== Company);
      }
    });
  };
  const HandleEducation = (event) => {
    const Education = event.target.value;
    const isChecked = event.target.checked;
 
    setSelectedEducation(prevEducation => {
      if (isChecked) {
       
        return [...prevEducation, Education];
      } else {
       
        return prevEducation.filter(edu => edu !== Education);
      }
    });
  };
  const HandlePostedDate = (event) => {
    const PostedDate = event.target.value;
    const isChecked = event.target.checked;
 
    setSelectedPostDate(prevPostedDate => {
      if (isChecked) {
       
        return [...prevPostedDate, PostedDate];
      } else {
       
        return prevPostedDate.filter(post => post !== PostedDate);
      }
    });
  };
  const HandleIndustryType = (event) => {
    const IndustryType = event.target.value;
    const isChecked = event.target.checked;
 
    setSelectedIndustryType(prevIndustryType => {
      if (isChecked) {
       
        return [...prevIndustryType, IndustryType];
      } else {
       
        return prevIndustryType.filter(int => int !== IndustryType);
      }
    });
  };
 
 
 
  const filteredJobs = useMemo(() => {
 
  return Joblist.filter((job) => {

    const matchesSearch = appliedFilters.query === "" || 
      job.title?.toLowerCase().includes(appliedFilters.query.toLowerCase()) ||
      job.company?.toLowerCase().includes(appliedFilters.query.toLowerCase()) ||
      job.KeySkills.some(skill =>skill.toLowerCase().includes(appliedFilters.query));

    const matchesSearchBarLocation = appliedFilters.location === "" || 
      job.location?.toLowerCase().includes(appliedFilters.location.toLowerCase());

    const JobExp = job.experience ? parseInt(job.experience.match(/\d+/)) : 0;
    let matchesSearchExp = true;
    if (appliedFilters.experience === "fresher") matchesSearchExp = JobExp === 0;
    else if (appliedFilters.experience === "1-3") matchesSearchExp = JobExp >= 1 && JobExp <= 3;
    else if (appliedFilters.experience === "3-5") matchesSearchExp = JobExp >= 3 && JobExp <= 5;
    else if (appliedFilters.experience === "5+") matchesSearchExp = JobExp >= 5;
    // Location Filter
    const jobLocation = job.location ? job.location.toLowerCase() : 'unknown location';
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(jobLocation);
 
    // Work Type Filter
    const jobWorkType = job.WorkType ? job.WorkType.toLowerCase() : 'unknown worktype';
    const matchesWorkType = selectedWorkType.length === 0 || selectedWorkType.includes(jobWorkType);
 
   // Postedby Filter
    const JobPostedby = job.PostedBy ? job.PostedBy.toLowerCase() : 'unknown Postedby';
    const matchesPostedby = SelectedPostedby.length === 0 || SelectedPostedby.includes(JobPostedby);
 
    // // TopCompany Filter
    const JobCompany = job.company ? job.company.toLowerCase() : 'unknown company';
    const matchesCompany = SelectedCompany.length === 0 || SelectedCompany.includes(JobCompany);
 
    const JobPosted = job.posted ? formatPostedDate(job.posted) : "UnKnown posted";
    const matchesPostedDate = SelectedPostDate.length === 0 || SelectedPostDate.includes(JobPosted);
 
    const matchesEducation = SelectedEducation.length === 0 || job.EducationRequired.some(edu => SelectedEducation.includes(edu.toLowerCase()))
 
    const matchesIndustryType = SelectedIndustryType.length === 0 || job.IndustryType.some(edu => SelectedIndustryType.includes(edu.toLowerCase()))
    
    const jobExpValue = job.experience ? parseInt(job.experience.match(/\d+/)) : 0;
    const matchesExperience = jobExpValue <= Exp;

    const jobSalaryNum = job.salary ? parseFloat(job.salary) : 0;
    const isAboveMin = jobSalaryNum >= minVal;
    const isBelowMax = maxVal >= 100 ? true : jobSalaryNum <= maxVal;

    const matchesSalary = isAboveMin && isBelowMax;

  
    return matchesLocation && matchesWorkType && matchesPostedby && matchesCompany && matchesEducation && matchesPostedDate && matchesExperience && matchesIndustryType && matchesSalary && matchesSearch && matchesSearchBarLocation && matchesSearchExp ;
  });
}, [Joblist,appliedFilters, selectedLocations, selectedWorkType,SelectedPostedby,SelectedCompany,SelectedEducation,SelectedPostDate, SelectedIndustryType,minVal,maxVal,Exp]);
 
  const sortedJobs = useMemo(() => {
   if (!sortBy) return filteredJobs;
   const jobsWithIndex = filteredJobs.map((job, index) => ({job,index
   }));
  
   if (sortBy === "date") {
     jobsWithIndex.sort(
       (first, second) =>
         new Date(second.job.posted) - new Date(first.job.posted)
     );
   }
  
   if (sortBy === "ratings") {
     jobsWithIndex.sort(
       (first, second) =>
         (second.job.ratings ?? 0) - (first.job.ratings ?? 0)
     );
   }
  
   return jobsWithIndex.map(item => item.job);
 }, [filteredJobs, sortBy]);
  
 
  return (
    <>
      <JHeader />
      <div className='jobs-tab-search-bar'>
        {/* <div className="search-bar">
          <div className="search-field">
            <span><img src={search} className="icon-size" alt="search_icon" /></span>
            <input type="text" value={searchQuery}onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by Skills, company or job title" />
          </div>
          <div className="separator"></div>
 
          <div className="search-field">
            <span><img src={location} className="icon-size" alt="location_icon" /></span>
            <input type="text" value={searchLocation}onChange={(e) => setSearchLocation(e.target.value)}  placeholder="Enter Location" />
          </div>
          <div className="separator"></div>
 
          <div className="search-field">
            <span><img src={tick} className="icon-size" alt="search_tick" /></span>
            <select value={searchExp} onChange={(e) => setLocalExp(e.target.value)} required>                       
            <option value="" disabled hidden>Enter Experience</option>
            <option value="fresher">Fresher</option>
            <option value="1-3">1-3 Years</option>
            <option value="3-5">3-5 Years</option>
            <option value="5+">5+ Years</option>
            </select>
          </div>
 
          <button onClick={handleSearchButtonClick} className="search-button">Search</button>
        </div> */}
        <SearchBar 
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
    searchLocation={searchLocation}
    setSearchLocation={setSearchLocation}
    searchExp={searchExp}
    setSearchExp={setSearchExp}
    onSearch={handleSearchButtonClick} 
  />
        
      </div>
      <div className='search-result-title'>
        <h1 > Jobs Based On Your Search</h1>
      </div>
 
 
 
      <div className='Mainsec-Search-Res'>
        <div className='Aside'>
          <div className='aside-header'>
            <p className='filter-heading'>Apply Filters</p>
            <p onClick={HandleClear} className='filter-applied'>Clear Filters</p>
          </div>
          <div className='Search-Worktype-Container'>
           
            <h4>Work Type</h4>
            {workTypeFilters.map(([work, workc]) => {
              const WorkType = work.charAt(0).toUpperCase() + work.slice(1);
              return (
                <div key={work}>
                  <label htmlFor={`WorkType-${work}`} className="location-checkbox-label">
                    <input
                      type="checkbox"
                      id={`WorkType-${work}`}
                      name="WorkType"
                      value={work}
                      onChange={HandleWorkType}
                      checked={selectedWorkType.includes(work)}
                    />
                    <span className="location-text">
                      {WorkType}
                      {/* {workc > 1 && ` (${workc})`} */}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
 
          <div className='Search-Worktype-Container'>
            <h4>Location</h4>
            {locationFilters.map(([locationKey, count]) => {
              const displayLocation = locationKey.charAt(0).toUpperCase() + locationKey.slice(1);
              return (
                <div key={locationKey}>
                  <label htmlFor={`location-${locationKey}`} className="location-checkbox-label">
                    <input
                      type="checkbox"
                      id={`location-${locationKey}`}
                      name="location"
                      value={locationKey}
                      onChange={handleLocationChange}
                      checked={selectedLocations.includes(locationKey)}
                    />
                    <span className="location-text">
                      {displayLocation}
                      {/* {count > 1 && ` (${count})`} */}
                    </span>
                  </label>
                </div>
              );
            })}
 
 
 
            <div className='viewmore-cont'>
              <button onClick={handleLocationViewMore} className='viewmore-btn'>{LocationExpanded ? 'View Less' : 'View More'}</button>
            </div>
 
 
          </div>
          
          <div className='Search-Worktype-Container'>
            <h4>Posted by</h4>
            {PostedbyFilter.map(([post, count]) => {  
              const Postedby = post.charAt(0).toUpperCase() + post.slice(1);
              return (
                <div key={post}>
                  <label htmlFor={`postedby-${post}`} className="location-checkbox-label">
                    <input
                      type="checkbox"
                      id={`postedby-${post}`}
                      name="postedby"
                      value={post}
                      onChange={HandlePostedby}
                      checked={SelectedPostedby.includes(post)}
                    />
                    <span className="location-text">
                      {Postedby}
                      {/* {count > 1 && ` (${count})`} */}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
 
          <div className='Search-Worktype-Container'>
            <h4>Top Companies</h4>
            {CompanyFilter.map(([com, count]) => {
              const Company = com.charAt(0).toUpperCase() + com.slice(1);
              return (
                <div key={com}>
                  <label htmlFor={`Company-${com}`} className="location-checkbox-label">  
                    <input
                      type="checkbox"
                      id={`Company-${com}`}
                      name="Company"
                      value={com}
                      onChange={HandleCompany}
                      checked={SelectedCompany.includes(com)}
                    />
                    <span className="location-text">
                      {Company}
                      {/* {count > 1 && ` (${count})`} */}
                    </span>
                  </label>
                </div>
              );
            })}
            <div className='viewmore-cont'>
              <button onClick={handleCompanyViewMore} className='viewmore-btn'>{ TopCompanyExpanded ? 'View Less' : 'View More'}</button>
            </div>
 
          </div>
 
          <div className='Search-Worktype-Container'>
            <h4>Education</h4>
            {EducationFilter.map(([edu,count]) => {
              const Education = edu.charAt(0).toUpperCase() + edu.slice(1);
              return (
                <div key={edu}>
                  <label htmlFor={`Education-${edu}`} className="location-checkbox-label">  
                    <input
                      type="checkbox"
                      id={`Education-${edu}`}
                      name="Education"
                      value={edu}
                      onChange={HandleEducation}
                      checked={SelectedEducation.includes(edu)}
                    />
                    <span className="location-text">
                      {Education}
                      {count > 1 && `(${count})`}
                    </span>
                  </label>
                </div>
              );
            })}
            <div className='viewmore-cont'>
              <button onClick={handleCompanyViewMore} className='viewmore-btn'>{ TopCompanyExpanded ? 'View Less' : 'View More'}</button>
            </div>
 
          </div>
 
          <div className='Search-Worktype-Container'>
            <h4>Freshness</h4>
            {PostedDateFilter.map(([Post,count]) => {
              const PostedDate = Post
              return (
                <div key={Post}>
                  <label htmlFor={`PostedDate-${Post}`} className="location-checkbox-label">  
                    <input
                      type="checkbox"
                      id={`PostedDate-${Post}`}
                      name="PostedDate"
                      value={Post}
                      onChange={HandlePostedDate}
                      checked={SelectedPostDate.includes(Post)}
                    />
                    <span className="location-text">
                      {PostedDate}
                     
                    </span>
                  </label>
                </div>
              );
            })}
            

          </div>
           
          <div className='Search-Worktype-Container'>
            <h4>Industry Type</h4>
            {IndustryTypeFilter.map(([int,count]) => {
              const IndustryType = int.charAt(0).toUpperCase() + int.slice(1);
              return (
                <div key={int}>
                  <label htmlFor={`IndustryType-${int}`} className="location-checkbox-label">  
                    <input
                      type="checkbox"
                      id={`IndustryType-${int}`}
                      name="IndustryType"
                      value={int}
                      onChange={HandleIndustryType}
                      checked={SelectedIndustryType.includes(int)}
                    />
                    <span className="location-text">
                      {IndustryType}
                      
                    </span>
                  </label>
                </div>
              );
            })}
            <div className='viewmore-cont'>
              <button onClick={handleIndustryViewMore} className='viewmore-btn'>{ IndustryTypeExpanded ? 'View Less' : 'View More'}</button>
            </div>
          </div>
           

          <div className="filter-group">
      <h3 className="section-title">Experience</h3>
      <div className="single-slider-container">
         <input type="range" className="Single-slider" min="0" max="30" value={Exp} onChange={(e) => SetExp(Math.max(Number(e.target.value)))} />
         <div className="salary-labels">
        <span>Exp: {Exp} Years</span>
      </div>
      </div>

      <h3 className="section-title">Salary</h3>
     <div className="range-container">
  {/* Grey background track */}
  <div className="slider-base-track" />
  
  {/* Blue filling track - This moves dynamically */}
  <div 
    className="slider-active-range" 
    style={{
      left: `${getPercent(minVal)}%`,
      width: `${getPercent(maxVal) - getPercent(minVal)}%`
    }}
  />

  <input
  className="slider multi thumb-left"
    type="range"
    min="0"
    max="100"
    value={minVal}
    onChange={(e) => setMinVal(Math.min(Number(e.target.value), maxVal - 1))}
    
  />

  <input
    className="slider multi thumb-right"
    type="range"
    min="0"
    max="100"
    value={maxVal}
    onChange={(e) => setMaxVal(Math.max(Number(e.target.value), minVal + 1))}
    
  />
</div>

      {/* Responsive Labels */}
      <div className="salary-labels">
        <span>Min: {minVal}LPA</span>
        {maxVal>=100? <span>Max:1 CPA</span> : <span>Max:{maxVal} LPA</span>}
        {/* <span>Max: {maxVal} LPA</span> */}
      </div>
          </div>
          
        </div>
 
        <div className='maincontent'>
           <div className='SortbySearch'>
            <h2 className='NoofJobsCont'>Showing {sortedJobs.length} Jobs</h2>
          <div className="sort-wrapper">
            
            <button
              className='Sortbutton'
              onClick={() => setOpenSort(!openSort)}
            >
              Sort by ▾
            </button>
 
            {openSort && (
              <div className="sort-dropdown">
                <div onClick={() => handleSort("recommended")}>Recommended</div>
                <div onClick={() => handleSort("ratings")}>Ratings</div>
                <div onClick={() => handleSort("date")}>Date</div>
              </div>
            )}
          </div>
        </div>
 
        
 
        {sortedJobs.map((jb, index) =>
          <div key={index} className='jobs-card'>
            <SearchResultsCard job={jb} />
          </div>
        )}
      </div>
      </div>
 
      <Footer />
    </>
  )
}
 
export default SearchResultsPage