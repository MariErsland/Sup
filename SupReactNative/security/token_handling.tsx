import EncryptedStorage from 'react-native-encrypted-storage';

export async function storeToken(token: any) {
    try {
        await EncryptedStorage.setItem("token", token);
    } catch (error) {
        console.log("Error: ", error)
    }
}

export async function retrieveToken() {
    try {   
        const session = await EncryptedStorage.getItem("token");
        
        if (session !== undefined) {
            return session;
        }
    } catch (error) {
        console.log("Error in retrieving: ", error);
    }
}

export async function deleteToken() {
    try {
        await EncryptedStorage.removeItem("token");
    } catch (error) {
        console.log("error in deleting token: ",error);
    }
}

