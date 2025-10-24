import React from 'react'
import main from '../gemini';
import { createContext } from 'react';

export const dataContext = createContext();

function UserContext({children}) {
  const [input, setInput] = React.useState("");
  const [showResult, setShowResult] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [resultData, setResultData] = React.useState("");
  const [recentPrompt, setRecentPrompt] = React.useState("");
  const [previousPrompt, setPreviousPrompt] = React.useState([]); 
  const [messages, setMessages] = React.useState([]);            
  const [conversations, setConversations] = React.useState({});  
  const [currentTitle, setCurrentTitle] = React.useState(null);   

  function newchat(){
    setShowResult(false);
    setLoading(false);
    setInput("");
    setResultData("");
    setMessages([]);
    setCurrentTitle(null);
  }

  async function send(input) {
    const firstInput = (input || '').trim();
    if (!firstInput) return;

    setResultData("");
    setShowResult(true);
    setRecentPrompt(firstInput);
    setLoading(true);


    let titleKey = currentTitle;
    if (!currentTitle && messages.length === 0) {
      titleKey = firstInput;
      setCurrentTitle(titleKey);
      setPreviousPrompt(prev => {
        const filtered = prev.filter(p => p !== titleKey);
        return [titleKey, ...filtered].slice(0, 50);
      });
      setConversations(prev => ({ ...prev, [titleKey]: [] }));
    } else if (!titleKey) {
      
      titleKey = previousPrompt[0] || firstInput;
    }

  
    setMessages(prev => {
      const next = [...prev, { role: 'user', content: firstInput }];
      setConversations(cv => ({ ...cv, [titleKey]: next }));
      return next;
    });

    try {
      const response = await main(firstInput);
      const cleaned = (response || "").replace(/[*#]/g, "");
      setMessages(prev => {
        const next = [...prev, { role: 'assistant', content: cleaned }];
        setConversations(cv => ({ ...cv, [titleKey]: next }));
        return next;
      });
      setResultData(cleaned);
    } catch (err) {
      console.error('send failed:', err);
      const fallback = 'Sorry, something went wrong. Please try again.';
      setMessages(prev => {
        const next = [...prev, { role: 'assistant', content: fallback }];
        setConversations(cv => ({ ...cv, [titleKey]: next }));
        return next;
      });
      setResultData(fallback);
    } finally {
      setLoading(false);
      setInput("");
    }
  }


  function openConversation(title) {
    const msgs = conversations[title] || [];
    setCurrentTitle(title);
    setMessages(msgs);
    setShowResult(msgs.length > 0);
  }

  const data = {
    input, setInput,
    send,
    showResult, setShowResult,
    loading, setLoading,
    resultData, setResultData,
    recentPrompt, setRecentPrompt,
    previousPrompt, setPreviousPrompt,
    newchat,
    messages, setMessages,
    conversations,
    openConversation,
  };

  return (
    <dataContext.Provider value={data}>
      {children}
    </dataContext.Provider>
  );
}

export default UserContext;