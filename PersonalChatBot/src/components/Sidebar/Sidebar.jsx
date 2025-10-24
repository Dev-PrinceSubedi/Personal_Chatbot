import React, { useState, useContext } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import "./Sidebar.css";  
import { dataContext } from '../../context/usercontext.jsx';

const Sidebar = () => {
  const [extend, setExtend] = useState(false);
  const { previousPrompt, newchat, openConversation } = useContext(dataContext);

  function handleOpen(title) {
    openConversation(title);
    setExtend(false); // close drawer on mobile
  }

  return (
    <>
      {/* Mobile Hamburger */}
      <button className="hamburger-menu" onClick={() => setExtend(prev => !prev)}>
        <GiHamburgerMenu />
      </button>

      <div className={`sidebar ${extend ? 'show' : 'hide'}`}>
        <GiHamburgerMenu id="ham" onClick={() => setExtend(prev => !prev)} />
        <div className="newchat" onClick={() => { newchat(); setExtend(false); }}>
          <FaPlus />
          {extend ? <span>New Chat</span> : ""}
        </div>

        {previousPrompt.map((item) => (
          <div className="recent" onClick={() => handleOpen(item)} key={item}>
            <FaHistory />
            {extend ? <span>{item.slice(0, 14)}...</span> : ""}
          </div>
        ))}
      </div>
    </>
  )
}

export default Sidebar