import React, {useState} from 'react'
import './JobsThroughCompany.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { OpportunitiesCard } from './OpportunitiesCard';
import { Footer } from '../Components-LandingPage/Footer';
import breifcase from '../assets/header_case.png'
import chat from '../assets/header_message.png'
import bell from '../assets/header_bell.png'
import profile from '../assets/header_profile.png'
import TCS from '../assets/TCS.png'
import Apple from '../assets/Apple-Logo.png'
import Wipro from '../assets/WIT.png'
import starIcon from '../assets/Star_icon.png'
import CTS from '../assets/CTSH_BIG.png'
import Amazon from '../assets/AMZN_BIG.png'
import Infy from '../assets/INFY_BIG.png'
import META from '../assets/META_BIG.png'
import Google from '../assets/GOOG.png'
import { CompaniesList } from "../CompaniesList";
import { Joblist } from '../JobList';
import { AvatarMenu } from './AvatarMenu';
import { JHeader } from './JHeader';

export const JobsThroughCompany = () => {

    const { companyId } = useParams()
    const filteredJobs = Joblist.filter(comp => comp.companyId === companyId);

    console.log(filteredJobs)

    const findbyCompaniesNameList = CompaniesList.slice(0, 8);
    const CompanyTitle = findbyCompaniesNameList.find(comp => comp.companyId === companyId);
    const navigate = useNavigate();

    const displayCount = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const indexofLastjob = currentPage * displayCount;
    const indexoffirstjob = indexofLastjob - displayCount;

    const currentJobCards = filteredJobs.slice(indexoffirstjob, indexofLastjob);
    const totalpages = Math.ceil(filteredJobs.length / displayCount);

    const HandlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }
    const HandleNext = () => {
        if (currentPage < totalpages) setCurrentPage(currentPage + 1);
    }

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const siblingCount = 1;

        if (totalpages <= 5) {
            for (let i = 1; i <= totalpages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);

            let startPage = Math.max(2, currentPage - siblingCount);
            let endPage = Math.min(totalpages - 1, currentPage + siblingCount);


            if (currentPage <= 3) {
                endPage = 4;
            }

            if (currentPage >= totalpages - 2) {
                startPage = totalpages - 3;
            }

            if (startPage > 2) {
                pageNumbers.push('...');
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (endPage < totalpages - 1) {
                pageNumbers.push('...');
            }

            pageNumbers.push(totalpages);
        }

        return pageNumbers.map((number, index) => {
            if (number === '...') {
                return <span key={`dots-${index}`} className="dots">...</span>;
            }
            return (
                <button
                    key={number}
                    className={`page-btn ${currentPage === number ? "active" : ""}`}
                    onClick={() => setCurrentPage(number)}>
                    {number}
                </button>
            );
        });
    };

    return (

        <>
            {/* <header className="header">
                <div className="logo">job portal</div>
                <nav className="nav-links">
                    <Link to="/Job-portal-Live/jobseeker/" className="nav-item" >Home</Link>
                    <Link to="/Job-portal-Live/jobseeker/jobs" className="nav-item" >Jobs</Link>
                    <Link to="/Job-portal-Live/jobseeker/companies" className="nav-item" >Companies</Link>
                </nav>

                <div className="auth-links">
                    <Link to="/Job-portal/jobseeker/myjobs"><img className='header-icons' src={breifcase} alt='My Jobs' /></Link>
                    <div><img className='header-icons' src={chat} alt='Messages' /></div>
                    <div><img className='header-icons' src={bell} alt='Notifications' /></div>
                    <AvatarMenu />
                </div>
            </header> */}
            <JHeader/>
            <div className='job-search-companies'>
                <section className='Opportunities-section'>
                    <div className="company-header-container">

                        <div className="company-details-section">
                            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
                            <div className='company-main-section'>
                                <div className='company-logo-container'>
                                    <img className='company-logo' src={CompanyTitle.logo} alt="logo" />
                                </div>

                                <div className="company-info-card">

                                    <h2 className="company-name">{CompanyTitle.companyName}</h2>
                                    <div className="company-title-container">
                                        <span className="star"><img src={starIcon} />  {CompanyTitle.ratings}</span> <span className="company-divider">|</span><span className="opp-reviews">{CompanyTitle.reviewNo} reviews</span>
                                    </div>

                                </div>
                                <div className='job-by-company-moto'>
                                    <p className="company-moto">{CompanyTitle.slogan}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Opportunities-job-list">

                        {currentJobCards.map((job, id) => (
                            <OpportunitiesCard key={id} job={job} />
                        ))}
                    </div>

                    <div className="Navigation-job-Tab">
                        <button
                            onClick={HandlePrev}
                            disabled={currentPage === 1}
                            className='Navigation-btn'
                        >
                            Previous
                        </button>

                        <div className="page-numbers">
                            {renderPageNumbers()}
                        </div>

                        <button
                            onClick={HandleNext}
                            disabled={currentPage === totalpages}
                            className='Navigation-btn'
                        >
                            Next
                        </button>
                    </div>

                </section>
            </div>

            <Footer />
        </>

    )


}
