import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

export async function storeUserToken(myToken: string) {
    try {
        await EncryptedStorage.setItem(
            "user_token",
            JSON.stringify({
                token : myToken,
            })
        );
        const token = await EncryptedStorage.getItem("user_token");
        console.log(token)
    } catch (error) {
        console.log(error);
    }
}

export async function retrieveUserToken() {
    try {   
        const token = await EncryptedStorage.getItem("user_token");
    
        if (token !== undefined) {
            return token;
        }
    } catch (error) {
        console.log(error);
    }
}

async function removeUserSession() {
    try {
        await EncryptedStorage.removeItem("user_token");
    } catch (error) {
        console.log(error);
    }
}

export const storeToken = async (token: any) => {
    console.log("In store token");
    try {
        await AsyncStorage.setItem('token', token);
    } catch (e) {
        console.log("Error storing token: ", e);
    }
};
  
export const retrieveToken = async () => {
    console.log("In retrieving token");
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (e) {
        console.log(e);
    }
};


export const deleteToken = async () => {
    console.log("In deleting token");
    try {
        await AsyncStorage.removeItem('token');
        console.log("Token deleted");
    }
    catch (err){
        console.log("error in deleting token",err);
    }
}


