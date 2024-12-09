
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const InactivityContext = createContext<any>(null);

export const useInactivity = () => useContext(InactivityContext);

const InactivityProvider = ({ children }: any) => {
  const [timeout, setTimeoutState] = useState<any>(null);
  const navigate = useNavigate();
  
  const inactivityLimit = 300; 

  const logoutUser = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    navigate('/login');
  };


  const resetInactivityTimer = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    const newTimeout = setTimeout(logoutUser, inactivityLimit * 1000);
    setTimeoutState(newTimeout);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    events.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timeout]);

  return (
    <InactivityContext.Provider value={{ resetInactivityTimer }}>
      {children}
    </InactivityContext.Provider>
  );
};

export default InactivityProvider;
