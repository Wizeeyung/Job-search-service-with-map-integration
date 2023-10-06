import React, { createContext, useContext, useState } from 'react';
import JobsCard from './JobsCard';

const LikedContext = createContext();

export const LikedProvider = ({ children }) => {
  const [like, setLike] = useState(false);

  return (
    <LikedContext.Provider value={{ like, setLike }}>
     {children}
    </LikedContext.Provider>
  );
};

export const useLikedContext = () => useContext(LikedContext);
