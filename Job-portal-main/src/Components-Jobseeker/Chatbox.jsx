import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Chatbox.css";
import { Header } from "../Components-LandingPage/Header";
import chat from '../assets/header_message.png';
import {  useJobs } from "./Jobcontext";
import { useRef } from "react";
 
export const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState("Inbox");
  const [input, setInput] = useState("");
 
  const navigate = useNavigate();
  const { onlineStatus,chats,activeChatId, setActiveChatId,setChats} = useJobs();
  const handleSelect = (item) => {
    setSelected(item);
    setIsOpen(false);
  };
 const activeChat = chats.find(c => c.id === activeChatId)
  const handleStatusClick = () => {
    navigate("/Job-portal/jobseeker/Settings", {
      state: { openTab: "Communication" }
    });
  };
  const scrollRef = useRef(null);
useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activeChat.messages, activeChat.status]);

    const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Current sender message (Me)
    const myMsg = { 
        id: Date.now(), 
        text: input, 
        sender: "me", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    

    // 2. Cross-chat receiver message (Friend)
    const receivedMsg = { ...myMsg, sender: "friend" };

    setChats(prev => prev.map(chat => {
        // Active chat-la 'me' nu update aagum (e.g., Ajeeth)
        if (chat.id === activeChatId) {
            return { ...chat, messages: [...chat.messages, myMsg] };
        }
        
        
        // if (activeChatId === 1 && chat.id === 2) {
        //     return { ...chat, messages: [...chat.messages, receivedMsg] };
        // }
        
        
        // if (activeChatId === 2 && chat.id === 1) {
        //     return { ...chat, messages: [...chat.messages, receivedMsg] };
        // }

        return chat;
    }));

    setInput("");
};
 useEffect(() => {
        const lastMsg = activeChat.messages[activeChat.messages.length - 1];
        
        if (lastMsg?.sender === "me" && activeChat.pendingData.length > 0) {
            
            // Set status to typing for active chat
            updateChatState(activeChatId, { status: "typing..." });

            const t2 = setTimeout(() => {
                const nextMsg = activeChat.pendingData[0];
                const newMessage = {
                    id: Date.now(),
                    text: nextMsg,
                    sender: "friend",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };

                updateChatState(activeChatId, {
                    messages: [...activeChat.messages, newMessage],
                    pendingData: activeChat.pendingData.slice(1),
                    status: "online"
                });
            }, 2000);

            return () => clearTimeout(t2);
        }
    }, [activeChat.messages]);

    // Helper function to update specific chat data
    const updateChatState = (id, newData) => {
        setChats(prev => prev.map(chat => 
            chat.id === id ? { ...chat, ...newData } : chat
        ));
    };
  return (
    <>
    <Header />
    <div className="messages-container">
      
 
      <div className="messages-sidebar">
        <div className="sidebar-header">
          <h2>Messages</h2>
          <div
            className={`status ${onlineStatus === "no" ? "offline-status" : ""}`}
            onClick={handleStatusClick}
            style={{ cursor: "pointer" }}
          >
            <span className={`dot ${onlineStatus === "no" ? "offline" : ""}`}></span>
            {onlineStatus === "yes" ? "Online" : "Offline"}
          </div>
        </div>
 
        <div
          className="dropdown-header"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected}
          <span className="messenger-arrow">›</span>
        </div>
 
        {isOpen && (
          <div className="dropdown-menu">
            {["Inbox", "Archive", "Spam"].map((item) => (
              <div
                key={item}
                className={`dropdown-item ${selected === item ? "active" : ""}`}
                onClick={() => handleSelect(item)}
              >
                {selected === item && <span className="check"></span>}
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
 
      <div className="EChat-Mainsec">
        {selected === "Inbox" &&(
        <>
        <div className="E-chat-name">
          <div style={{height:"100vh"}} className="web-sidebar">
                <div  className="sidebar-header">Chats</div>
                {chats.map(chat => (
                    <div style={{ margin:"5px 0px"}}
                        key={chat.id}
                        className={`sidebar-item ${activeChatId === chat.id ? 'active' : ''}`}
                        onClick={() => setActiveChatId(chat.id)}
                    >
                        <strong>{chat.name}</strong>
                        <div className="sidebar-status">{chat.status}</div>
                    </div>
                ))}
            </div>
        </div>
        <div className="web-main-chat">
                <header className="web-chat-header">
                    <div className="user-info">
                        <strong>{activeChat.name}</strong>
                        <div className={`status-text ${activeChat.status === 'typing...' ? 'typing' : ''}`}>
                            {activeChat.status}
                        </div>
                    </div>
                </header>

                <div className="web-chat-window" ref={scrollRef}>
                    {activeChat.messages.map((m) => (
                        <div key={m.id} className="web-msg-row">
                            <div className={`web-bubble web-${m.sender}`}>
                                {m.text}
                                <div className="web-time">{m.time}</div>
                            </div>
                        </div>
                    ))}
                    {activeChat.status === "typing..." && (
                        <div className="web-msg-row">
                            <div className="web-bubble web-friend typing-bubble">
                                {activeChat.name} is typing...
                            </div>
                        </div>
                    )}
                </div>

                <form className="web-input-bar" onSubmit={handleSend}>
                    <input 
                        className="web-text-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button type="submit" className="web-send-button">SEND</button>
                </form>
            </div>
        </>
        )}
      </div>

    </div>
    </>
  );
};
 
 
 