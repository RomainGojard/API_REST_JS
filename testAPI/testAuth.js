const axios = require('axios');

const baseUrl = 'http://localhost:3000';
const credentials = {
  email: 'chico1@gmail.com',
  password: 'securePassword'
};

let token;

function signup() {
  const userCreationData = {
    name: 'Chico',
    email: credentials.email,
    password: credentials.password,
  };

  return axios
    .post(`${baseUrl}/auth/signup`, userCreationData)
    .then((response) => {
      console.log('User created successfully:', response.data);
    });
}

function login() {
  return axios
    .post(`${baseUrl}/auth/login`, credentials)
    .then((response) => {
      console.log('User login successfully:', response.data);
      token = response.data.token;
    });
}

// Run the tests
signup()
  .then(login)
  .catch((error) => {
    console.error('Error:', error.response ? error.response.data : error.message);
  });
