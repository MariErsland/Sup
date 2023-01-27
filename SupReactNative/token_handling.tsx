import AsyncStorage from '@react-native-async-storage/async-storage';
import { encrypt, decrypt } from './encrypting'; 


export const storeToken = async (token: string) => {
    try {
        const encryptedToken = encrypt(token);
        await AsyncStorage.setItem('token', encryptedToken);
    } catch (e) {
        console.log(e);
    }
};
  
export const retrieveToken = async () => {
    try {
        const encryptedToken = await AsyncStorage.getItem('token');
        const token = decrypt(encryptedToken);
        return token;
    } catch (e) {
        console.log(e);
    }
};

