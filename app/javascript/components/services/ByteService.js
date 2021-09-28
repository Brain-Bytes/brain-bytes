import axios from 'axios';
import { print } from 'graphql';

export const getBytes = async (setBytes, setError) => {
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
};

export const getOlderBytes = async (lastByteId, bytes, setBytes, setHasMoreBytesToLoad) => {
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

  const olderBytes = response.data.data.fetchOlderBytes;
  if (olderBytes.length === 0) return setHasMoreBytesToLoad(false);

  const copyBytes = [...bytes];
  setBytes([...copyBytes, ...olderBytes]);
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

export const deleteByte = async (byteId, bytes, setBytes) => {
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

  const copyBytes = [...bytes];
  const index = copyBytes.findIndex((byte) => Number(byte.id) === Number(byteId));
  copyBytes.splice(index, 1);
  setBytes(copyBytes);
};

export const toggleLike = async (byteId, userId, bytes, setBytes) => {
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

  const likedByte = response.data.data.toggleLike.byte;
  const { id, likesCount, likedByCurrentUser } = likedByte;
  const copyBytes = [...bytes];
  const index = copyBytes.findIndex((_byte) => _byte.id === id);
  copyBytes[index].likesCount = likesCount;
  copyBytes[index].likedByCurrentUser = likedByCurrentUser;
  setBytes(copyBytes);
};
