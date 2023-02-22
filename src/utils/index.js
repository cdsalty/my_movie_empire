import axios from 'axios';

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

// follow the documentation: https://developers.themoviedb.org/3/authentication/how-do-i-generate-a-session-id
export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get('/authentication/token/new');
    // console.log('response from the utils index file:', response);
    const token = data.request_token;
    console.log('token:', token);
    if (data.success) {
      // if we have a token, we can store it in the local storage under the key 'request_token'
      localStorage.setItem('request_token', token);
      // Per the documentation, we need to redirect the user to the following URL
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.warn('Sorry, your token could not be created.');
  }
};

// Step 3 - Create a session ID
export const createSessionId = async () => {
  // get the token from the local storage
  const token = localStorage.getItem('request_token');
  // if the token exists, we can use it to create a session ID
  if (token) {
    try {
      // const response = await moviesApi.post('/authentication/session/new', {
      // Destrictured the response
      const {
        data: { session_id },
      } = await moviesApi.post('/authentication/session/new', {
        request_token: token,
      });
      localStorage.setItem('session_id', session_id);
      console.log('session_id:', session_id);
      return session_id;
    } catch (error) {
      console.log(error);
    }
  }
};

// will be referenced inside the NavBar component
