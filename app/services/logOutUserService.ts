import axios from 'axios';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder'; 

async function logoutUser(userId: number | undefined, token: string | undefined): Promise<boolean> {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/logout/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Logout successful:', response.data);
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

export { logoutUser };
