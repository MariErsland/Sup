import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeToken = async (token: string) => {
    try {  
         AsyncStorage.setItem('token', token.toString()); 
        }
    catch (e) {
        console.log(e);
      }
    };
  
export const retrieveToken = async () => {
    try {
        let result = await AsyncStorage.getItem('token')
        return result;
    } 
    catch (e) {
        console.log(e);
    }
};

export async function removeToken() {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error(error);
    }
  }

