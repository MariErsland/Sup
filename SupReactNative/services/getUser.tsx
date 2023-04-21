
import {retrieveToken}  from '../security/token_handling';

export async function getUser() {
  const myToken = await retrieveToken();
  let response = fetch("http://152.94.160.72:3000/user/userByToken", {
    headers: {
      Authorization: `Bearer ${myToken}`
    }
  })
  .then((response) => {
  try {
      return response.json();
  }
  catch (error) {
      console.error('Error parsing response as JSON', error);
      throw error;
  }
  })
  .catch((error) => {
  console.error('Error fetching data: ', error);
  });
  const user = await response;
  return user;
}