const axios = require('axios');

const loginUrl = 'http://localhost:3000/auth/login';

// Données d'authentification (email et mot de passe)
const credentials = {
  email: 'john.doe@example.com',
  password: 'securePassword'
};

// Appel de la route login avec Axios
axios.post(loginUrl, credentials)
  .then(response => {
    const token = response.data.token;
    console.log('Token:', token);

    // Remplacez l'URL par la route de récupération de tous les utilisateurs de votre API
    const usersUrl = 'http://localhost:3000/users';

    // Appel de la route pour récupérer tous les utilisateurs avec Axios
    axios.get(usersUrl, {
        headers: {
          Authorization: token
        }
      })
      .then(response => {
        console.log('Tous les utilisateurs:', response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error.response.data);
      });

      // get user by id
        const userUrl = 'http://localhost:3000/users/64ba679439533405905a97ee';
        //axios request
        axios.get(userUrl, {
            headers: {
                Authorization: token
            }
        })
        //response
        .then(response => {
            console.log('Utilisateur:', response.data);
        }
        )
        .catch(error => {
            console.error('Erreur lors de la récupération de l\'utilisateur:', error.response.data);
        }
        );
  })
  .catch(error => {
    console.error('Erreur lors de la connexion:', error.response.data);
  });




/*
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'securePassword'
};

axios.post('http://localhost:3000/auth/signup', userData)
  .then(response => {
    console.log('User created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating user:', error.response.data);
    console.error('Status code:', error.response.status);
    console.error('Status text:', error.response.statusText);
  });
*/

/*
const userData = {
    email: 'john.doe@example.com',
    password: 'securePassword'
  };

  axios.post('http://localhost:3000/auth/login', userData)
  .then(response => {
    console.log('User login successfully:', response.data);
  })
  .catch(error => {
    console.error('Error login user:', error.response.data);
  });
*/



