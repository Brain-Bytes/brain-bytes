import axios from 'axios';
import { print } from 'graphql';

export const getBytes = async () => {
  const response = await axios({
    url: `graphql`,
    method: 'post',
    data: {
      refresh_token: localStorage.getItem('refreshToken'),
      query: `
        query {
          fetchBytes {
            id
            title
            body
            createdAt
            user {
              id
              username
            }
            tags {
              name
            }
            likesCount
            likedByCurrentUser
          }
        }
      `,
    },
    headers: { Authorization: localStorage.getItem('token') },
  });

  return response;
};

export const getBytesFromFolder = async (id) => {
  const response = await axios({
    url: `graphql`,
    method: 'post',
    data: {
      refresh_token: localStorage.getItem('refreshToken'),
      query: `
        query {
          fetchBytes {
            id
            title
            body
            createdAt
            user {
              id
              username
            }
            tags {
              name
            }
            likesCount
            likedByCurrentUser
            saved
          }
        }
      `,
    },
    headers: { Authorization: localStorage.getItem('token') },
  });

  return response;
};

export const getOlderBytes = async (lastByteId) => {
  const response = await axios({
    url: `graphql`,
    method: 'post',
    data: {
      refresh_token: localStorage.getItem('refreshToken'),
      query: `
      query {
        fetchOlderBytes(lastByteId: ${lastByteId}) {
          id
            title
            body
            createdAt
            user {
              id
              username
            }
            tags {
              name
            }
            likesCount
            likedByCurrentUser
        }
      }
      `,
    },
    headers: { Authorization: localStorage.getItem('token') },
  });

  return response;
};

export const addByte = async (ADD_BYTE_MUTATION, variables) => {
  const response = await axios({
    url: `graphql`,
    method: 'post',
    data: {
      refresh_token: localStorage.getItem('refreshToken'),
      query: print(ADD_BYTE_MUTATION),
      variables,
    },
    headers: { Authorization: localStorage.getItem('token') },
  });

  return response;
};

export const deleteByte = async (byteId) => {
  const response = await axios({
    url: `graphql`,
    method: 'post',
    data: {
      refresh_token: localStorage.getItem('refreshToken'),
      query: `
        mutation {
          deleteByte(input: { id: ${byteId} }) {
            byte {
              id
              title
              body
            }
          }
        }
      `,
    },
    headers: { Authorization: localStorage.getItem('token') },
  });

  return response;
};

export const toggleLike = async (byteId, userId) => {
  const response = await axios({
    url: `graphql`,
    method: 'post',
    data: {
      refresh_token: localStorage.getItem('refreshToken'),
      query: `
        mutation {
          toggleLike(input: {userId: ${userId}, byteId: ${byteId}}) {
            byte {
              id
              likesCount
              likedByCurrentUser
            }
          }
        }
      `,
    },
    headers: { Authorization: localStorage.getItem('token') },
  });

  return response;
};
