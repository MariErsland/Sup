import StackNavigationHome from './navigation/StackNavigationHome'
import { createContext, useEffect, useState, useContext } from 'react';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ILoginContext {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginContext = createContext<ILoginContext>({ isLoggedIn: false, setIsLoggedIn: () => { } });

export const LoginProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
}

function App() {
  return (
    <StackNavigationHome />
  );
  
}

export default App;

