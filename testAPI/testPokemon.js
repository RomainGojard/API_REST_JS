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

    // Remplacez l'URL par la route de récupération de tous les pokemon de votre API
    const pokemonsURL = 'http://localhost:3000/pokemons';

    // Appel de la route pour récupérer tous les utilisateurs avec Axios
    axios.get(pokemonsURL, {
        headers: {
          Authorization: token
        }
      })
      .then(response => {
        console.log('Tous les pokemons:', response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des pokemons:', error.response.data);
      });

        // get pokemon by name
        const pokemonUrl = 'http://localhost:3000/pokemons/charmander';
        
  })
  .catch(error => {
    console.error('Erreur lors de la connexion:', error.response.data);
  });


