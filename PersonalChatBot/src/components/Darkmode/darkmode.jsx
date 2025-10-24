import React, { useEffect, useState } from 'react'
import { MdOutlineWbSunny } from "react-icons/md";
import "./darkmode.css";
import { MdOutlineDarkMode } from "react-icons/md";

const darkmode = () => {

    const [mode, setMode]= useState("darkmode")

    function toggle(){
        if(mode==="darkmode"){
            setMode("lightmode");
        }
        else{
            setMode("darkmode");
        }
    }

    useEffect(()=>{
        document.body.className= mode;
    },[mode])

  return (
    <button className="darkmodebtn" onClick={()=>{
        toggle()
    }}>{mode==="darkmode"?<MdOutlineDarkMode />:<MdOutlineWbSunny />}</button>

  )
}

export default darkmode