import React, { useRef, useEffect, createContext } from 'react'
import './Chatsection.css'
import Darkmode from '../Darkmode/darkmode.jsx'
import { TbSend2 } from "react-icons/tb";
import { useContext } from 'react'
import { dataContext } from '../../context/usercontext.jsx';
import { FaUser } from "react-icons/fa6";
import { RiRobot3Fill } from "react-icons/ri";
import { useState } from 'react';


function Chatsection() {

  const {send, input, setInput, showResult, loading, resultData, recentPrompt, messages} = useContext(dataContext);
  const listRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input && input.trim()) {
        send(input);
      }
    }
  };

  
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="chatsection">
        <div className="topsection">
          {messages.length === 0 && !showResult ? (
            <div className="headings">
              <span>HELLO THERE,</span>
              <span>I'm your personal assistant</span>
              <span>How can I help you today?</span>
            </div>
          ) : (
            <div className="result" ref={listRef}>
              {messages.map((m, i) =>
                m.role === 'user' ? (
                  <div className="userbox" key={i}>
                    <FaUser />
                    <p>{m.content}</p>
                  </div>
                ) : (
                  <div className="aibox" key={i}>
                    <RiRobot3Fill />
                    <p>{m.content}</p>
                  </div>
                )
              )}
              {loading && (
                <div className="aibox">
                  <RiRobot3Fill />
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="bottomsection">
          <input 
            onChange={(e)=>{setInput(e.target.value)}} 
            onKeyDown={handleKeyDown} 
            type="text" 
            value={input} 
            placeholder="Enter a prompt" 
          />
          {input?<button className="sendbtn" onClick={()=>{send(input)}}><TbSend2 /></button>:""}
          
          <Darkmode />
        </div>
    </div>

  )
}

export default Chatsection