import axios from 'axios';

export const getFolders = async (userId) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_URL}/graphql`,
    method: 'post',
    data: {
      refresh_token: localStorage.getItem('refreshToken'),
      query: `
        query {
          fetchUserFolders(userId: ${userId}) {
            id
            name
            numberOfBytes
            default
          }
        }
      `,
    },
    headers: { Authorization: localStorage.getItem('token') },
  });

  return response.data.data.fetchUserFolders;
};

export const addFolder = async () => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_URL}/graphql`,
    method: 'post',
    data: {
      refresh_token: localStorage.getItem('refreshToken'),
      query: `
        mutation {
          addFolder(input: {}) {
            folder {
              id
              name
              numberOfBytes
              default
            }
          }
        }
      `,
    },
    headers: { Authorization: localStorage.getItem('token') },
  });

  return response.data.data.addFolder.folder;
};

export const editFolder = async (id, name) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_URL}/graphql`,
    method: 'post',
    data: {
      refresh_token: localStorage.getItem('refreshToken'),
      query: `
        mutation {
          editFolder(input: {id: ${id}, name: "${name}"}) {
            folder {
              id
              name
              numberOfBytes
              default
            }
          }
        }
      `,
    },
    headers: { Authorization: localStorage.getItem('token') },
  });

  return response.data.data.editFolder.folder;
};
export const deleteFolder = async (id) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_URL}/graphql`,
    method: 'post',
    data: {
      refresh_token: localStorage.getItem('refreshToken'),
      query: `
        mutation {
          deleteFolder(input: {id: ${id}}) {
            folder {
              id
            }
          }
        }
      `,
    },
    headers: { Authorization: localStorage.getItem('token') },
  });

  return response.data.data.deleteFolder.folder;
};

export const addOrRemoveByteFromFolder = async (folderId, byteId) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_URL}/graphql`,
    method: 'post',
    data: {
      refresh_token: localStorage.getItem('refreshToken'),
      query: `
        mutation {
          saveByteInFolder(input: {folderId: ${folderId}, byteId: ${byteId}}) {
            folder {
              id
              name
              numberOfBytes
              default
            }
          }
        }
      `,
    },
    headers: { Authorization: localStorage.getItem('token') },
  });

  return response.data.data.saveByteInFolder.folder;
};
