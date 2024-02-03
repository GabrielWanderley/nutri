import React, { createContext, useContext, useState } from 'react';

const TbmContext = createContext();

export const useTbmContext = () => {
  return useContext(TbmContext);
};

export const TbmProvider = ({ children }) => {
  const [tbmResult, setTbmResult] = useState(null);

  const setTbm = (result) => {
    setTbmResult(result);
  };

  return (
    <TbmContext.Provider value={{ tbmResult, setTbm }}>
      {children}
    </TbmContext.Provider>
  );
};