
import StackNavigationHome from './navigation/StackNavigationHome'
import {createContext, useState} from 'react';
import React from 'react';


export const LoginContext = createContext<{isLoggedIn: boolean, setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>}>({isLoggedIn: false, setIsLoggedIn: () => {}});

export const LoginProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
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

/*
const App = () => {

function Fetch(){
  const users = fetch("http://152.94.160.72:3000/user/${id}")
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    setData(data);
  })
}

const [data, setData] = useState([{id: 100, email: 1, first_name: "Mari"}]);
  return (
    <View>
        <Text>Hello, React Native!</Text>
        <Button title="Press me" onPress={Fetch}/>
        {
          data.map((item) => {
            return(
              <View key={item.id}>
                <Text>{item.first_name}</Text>
              </View>
            )
          })
        }
    </View>
  );
};

export default App;
*/