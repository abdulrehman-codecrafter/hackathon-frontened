import React, { createContext, useState, useContext } from 'react';

const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastConfig, setToastConfig] = useState({});

  const showToast = (type, message, duration = 600) => {
    setToastConfig({ type, message });
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ toastVisible, toastConfig, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
