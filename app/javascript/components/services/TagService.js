import axios from 'axios';

export const getTags = async () => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_URL}/graphql`,
    method: 'post',
    data: {
      refresh_token: localStorage.getItem('refreshToken'),
      query: `
        query {
          fetchTags {
            name
            bytes {
              id
            }
          }
        }
      `,
    },
    headers: { Authorization: localStorage.getItem('token') },
  });

  return response;
};
