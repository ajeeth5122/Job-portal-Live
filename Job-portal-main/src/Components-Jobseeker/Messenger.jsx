import React, { useState, useEffect, useRef } from 'react';
import './Messenger.css';
import { useJobs } from './Jobcontext';
import { useNavigate } from 'react-router-dom';

export const Messenger = () => {
    const { chats, setChats, activeChatId, onlineStatus,setActiveChatId} = useJobs();
    // const [chats, setChats] = useState([
    //         {
    //             id: 1,
    //             name: "Ajeeth A",
    //             status: "online",
    //             messages: [{ id: 1, text: "Welcome to Job Portal Messenger!", sender: "friend", time: "10:30 AM" }],
    //             pendingData: [
    //                 "Hi! I came across your profile...",
    //                 "We currently have an opening...",
    //                 "That's great! Remote or Relocation?"
    //             ]
    //         },
    //         {
    //             id: 2,
    //             name: "Harsha A",
    //             status: "online",
    //             messages: [{ id: 1, text: "Hey, are you free for a call?", sender: "friend", time: "11:11 AM" }],
    //             pendingData: ["I saw your portfolio.", "Can we discuss the salary?"]
    //         },
    //         {
    //             id: 3,
    //             name: "SuryaKumar R",
    //             status: "offline",
    //             messages: [{ id: 1, text: "Referral update: Sent!", sender: "friend", time: "09:00 AM" }],
    //             pendingData: ["Check your mail."]
    //         },
    //         {
    //             id: 4,
    //             name: "ThomasAntony p",
    //             status: "away",
    //             messages: [{ id: 1, text: "Hey There", sender: "friend", time: "08:00 AM" }],
    //             pendingData: []
    //         },
    //         {
    //             id: 5,
    //             name: "Naveen",
    //             status: "Online",
    //             messages: [{ id: 1, text: "is any designs needed please feel free to reachout..", sender: "friend", time: "12:00 PM" }],
    //             pendingData: []
    //         },
    //     ]);

    // 2. State to track which chat is selected
    const navigate=useNavigate();

    const [input, setInput] = useState("");

    const scrollRef = useRef(null);

    const activeChat = chats.find(c => c.id === activeChatId)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activeChat.messages, activeChat.status]);

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

    const updateChatState = (id, newData) => {
        setChats(prev => prev.map(chat =>
            chat.id === id ? { ...chat, ...newData } : chat
        ));
    };
    const handleStatusClick = () => {
        navigate("/Job-portal-Live/jobseeker/Settings", {
            state: { openTab: "Communication" }
        });
    };
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

    return (
        <div className="web-messenger-container">
            <div>
                
                <div className="E-chat-name">
          <div style={{height:"100vh"}} className="web-sidebar">
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
            </div>


            {/* Main Chat Area */}
            <div className="web-main-chat">
                <header className="web-chat-header">
                    <div className="user-info">
                        <strong>{activeChat.name}</strong>
                        <div className={`status-text ${activeChat.status === 'typing...' ? 'typing' : ''} ||${activeChat.status === 'online' ? 'online' : ''} `}>
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
        </div>
    );
};