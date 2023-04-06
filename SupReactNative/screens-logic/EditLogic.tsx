import { useContext, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LoginContext } from '../App';
import { useAuth } from '../security/auth';
import { retrieveToken } from '../security/token_handling';
import { validateInputCharacters, validateInputLength } from '../helpers/inputValiation';

export const useEditLogic = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { isLoggedIn } = useContext(LoginContext);
  useAuth({ isLoggedIn, navigation });
  const [error, setError] = useState('');
  const nameMaxLength = 30;
  const MIN_LENGHT_FIRST_NAME = 2;

  if (!route.params) return { error: 'No route parameters found' };

  const email: any = route.params.params.email;
  const firstName2: any = route.params.params.firstName;

  console.log("Email: ", email)

  const [firstName, setFirstName] = useState(firstName2);

  async function saveChanges() {
    if ((!firstName.trim()) || (firstName.length < MIN_LENGHT_FIRST_NAME)) {
      console.log("selected name: ", firstName);
      console.log("All input field must be filled out");
      setError("All input field must be filled out and must be at least " + MIN_LENGHT_FIRST_NAME)
      return;
  }
    const myToken = await retrieveToken();
    try {
      console.log("Name before update user: ", firstName);
      console.log("email before update user: ", email);
      const response = await fetch(`http://152.94.160.72:3000/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${myToken}`,
        },
        body: JSON.stringify({ first_name: firstName, email: email })
      });
      const data = await response.json();
      console.log('User updated successfully', data);
      navigation.navigate('Profile', {params: {user: data}});


    } catch (error) {
      console.log('Error updating user', error);
    }
  }

  function handleSetFirstName(text: string ){
    const errorMessageLength = validateInputLength(text, nameMaxLength);
    const errorMessageCharacters = validateInputCharacters(text);
    if (errorMessageCharacters !== '')
    {
        setError(errorMessageLength + ' ' + errorMessageCharacters)
    }
    else {
        setError(errorMessageLength + ' ' + errorMessageCharacters)
        setFirstName(text)
    }
}


return {
    firstName,
    setFirstName,
    email,
    error,
    setError,
    saveChanges,
    handleSetFirstName,
  };
};

export default useEditLogic;