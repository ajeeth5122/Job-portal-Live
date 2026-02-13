import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './Settings.css';
import { Header } from '../Components-LandingPage/Header';
import { useJobs } from './Jobcontext';
 
export const Settings = () => {    
    const location = useLocation();
 
    const { onlineStatus, setOnlineStatus } = useJobs()
    const [tab, setTab] = useState('Account');
    const [read, setRead] = useState('yes');
 
    useEffect(() => {
        if (location.state?.openTab) {
            setTab(location.state.openTab);
        }
    }, [location]);
 
    return (
        <div className="app">
            <Header />
 
            <div style={{ marginTop: "120px" }} className="JSettings-header-box">
                <h2>{tab === 'Privacy' ? 'Privacy Policy' : tab + ' Settings'}</h2>
            </div>
 
            <div style={{ marginTop: "50px", padding: "45px" }} className="JSettings-main-layout">
               
                {/* Sidebar */}
                <aside className="JSettings-sidebar">
                    <button
                        onClick={() => setTab('Account')}
                        className={tab === 'Account' ? 'active' : ''}
                    >
                        Account Settings
                    </button>
 
                    <button
                        style={{marginTop:"20px"}}
                        onClick={() => setTab('Communication')}
                        className={tab === 'Communication' ? 'active' : ''}
                    >
                        Communication Settings
                    </button>
 
                    <button
                        style={{marginTop:"20px"}}
                        onClick={() => setTab('Security')}
                        className={tab === 'Security' ? 'active' : ''}
                    >
                        Security Settings
                    </button>
 
                    <button
                        style={{marginTop:"20px"}}
                        onClick={() => setTab('Privacy')}
                        className={tab === 'Privacy' ? 'active' : ''}
                    >
                        Privacy Policy
                    </button>
                </aside>
 
                {/* Content */}
                <div className="JSettings-content">
 
                    {/* Account */}
                    {tab === 'Account' && (
                        <div className="JSettings-form">
                            <input placeholder='Account Type' type="text" />
                            <input style={{ marginTop: "20px" }} placeholder='Email Id ' type="email" />
                            <input style={{ marginTop: "20px" }} placeholder='Phone Number' type="phone" />
                        </div>
                    )}
 
                    {/* Communication */}
                    {tab === 'Communication' && (
                        <div className="JSettings-list">
                           
                            {/* Online Status */}
                            <div className="JSettings-row">
                                <span>Show Online Status</span>
                                <div className="JSettings-btn-group">
                                   
                                    <button
                                        className={onlineStatus === 'yes' ? 'JSettings-active-btn' : 'JSettings-flat-btn'}
                                        onClick={() => setOnlineStatus('yes')}
                                    >
                                        Yes
                                    </button>
 
                                    <button
                                        className={onlineStatus === 'no' ? 'JSettings-active-btn' : 'JSettings-flat-btn'}
                                        onClick={() => setOnlineStatus('no')}
                                    >
                                        No
                                    </button>
 
                                </div>
                            </div>
 
                            {/* Read Receipts */}
                            <div className="JSettings-row">
                                <span>Show Read Receipts</span>
                                <div className="JSettings-btn-group">
                                   
                                    <button
                                        className={read === 'yes' ? 'JSettings-active-btn' : 'JSettings-flat-btn'}
                                        onClick={() => setRead('yes')}
                                    >
                                        Yes
                                    </button>
 
                                    <button
                                        className={read === 'no' ? 'JSettings-active-btn' : 'JSettings-flat-btn'}
                                        onClick={() => setRead('no')}
                                    >
                                        No
                                    </button>
 
                                </div>
                            </div>
 
                        </div>
                    )}
 
                    {/* Security */}
                    {tab === 'Security' && (
                        <div className="list">
                            <div className="box">Security Settings</div>
                            <div className="box">Account Protection</div>
                            <div className="box">Third Party apps</div>
                            <div className="box">Restrict Duplicate Applications</div>
                        </div>
                    )}
 
                    {/* Privacy */}
                    {tab === 'Privacy' && (
                        <div style={{borderRadius:"10px"}} className="privacy">
                            <h2>Type Of Data Collected</h2>
                            <p>
                                We collect different types of data depending on how you interact with us...
                            </p>
                            <hr className="Opportunities-separator" />
 
                            <h2 style={{marginTop:"15px"}}>How my data is used and disclosed</h2>
                            <p>
                                Job App uses data to help people get jobs...
                            </p>
                            <hr className="Opportunities-separator" />
 
                            <h2 style={{marginTop:"15px"}}>Cookies</h2>
                            <p>
                                Our Cookie Policy explains how we use cookies...
                            </p>
                            <hr className="Opportunities-separator" />
 
                            <h2 style={{marginTop:"15px"}}>Hide My CV</h2>
                            <p>
                                You can also set your Resume to "not searchable"...
                            </p>
                        </div>
                    )}
 
                </div>
            </div>
        </div>
    );
};
 
 