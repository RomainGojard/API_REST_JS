const axios = require('axios');

const baseUrl = 'http://localhost:3000';
const credentials = {
  email: 'john.doe@example.com',
  password: 'securePassword'
};

let token;

function login() {
  return axios
    .post(`${baseUrl}/auth/login`, credentials)
    .then((response) => {
      console.log('User login successfully:', response.data);
      token = response.data.token;
    });
}

function getAllUsers() {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  return axios
    .get(`${baseUrl}/users`, config)
    .then((response) => {
      console.log('All users:', response.data);
    });
}

function getUserById() {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  return axios
    .get(`${baseUrl}/users/64ba679439533405905a97ee`, config)
    .then((response) => {
      console.log('User:', response.data);
    });
}

// Run the tests
login()
  .then(getAllUsers)
  .then(getUserById)
  .catch((error) => {
    console.error('Error:', error.response ? error.response.data : error.message);
  });
