import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (e) {
        console.log(e);
    }
};
  
export const retrieveToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (e) {
        console.log(e);
    }
};

export const deleteToken = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
    }
    catch (err){
        console.log(err);
    }
}


