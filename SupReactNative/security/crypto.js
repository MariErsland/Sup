import EncryptedStorage from 'react-native-encrypted-storage';


export async function removeUserSession() {
    try {
        await EncryptedStorage.removeItem("user_session");
        // Congrats! You've just removed your first value!
    } catch (error) {
        // There was an error on the native side
    }
}


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

/*export async function storeToken(token: any) {
    try {
        await EncryptedStorage.setItem("user_token", token);
        console.log("Stored token");
    // Congrats! You've just stored your first value!
    } catch (error) {
        console.log("Error: ", error)// There was an error on the native side
    }
}

export async function retrieveToken() {
    try {   
        const session = await EncryptedStorage.getItem("user_token");
        
        if (session !== undefined) {
            console.log("Retrieved token: ", session)
            // Congrats! You've just retrieved your first value!
        }
    } catch (error) {
        console.log("Error in retrieving: ", error);
        // There was an error on the native side
    }
}*/