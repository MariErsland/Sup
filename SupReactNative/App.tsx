import React from 'react';
import StackNavigationHome from './StackNavigationHome'

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