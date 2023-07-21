const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmE2Nzk0Mzk1MzM0MDU5MDVhOTdlZSIsImlhdCI6MTY4OTk1MjkxNywiZXhwIjoxNjg5OTU2NTE3fQ.4caamM8QsK_xSYmHKY0PP835_IEmY7iAiVcSXPh3gYU'; 


const axios = require('axios');

// URL de votre API pour SUPPRIMER un Pokémon
const updatePokemonUrl = 'http://localhost:3000/pokemons/Pikachu'; 

// Configurations pour inclure le token dans l'en-tête de la requête
const config = {
  headers: {
    Authorization: token,
  },
};

// Appel de la route pour mettre à jour un Pokémon avec Axios et le token d'authentification (si nécessaire)
axios.delete(updatePokemonUrl, config)
  .then(response => {
    console.log('Réponse :', response.data);
  })
  .catch(error => {
    console.error('Erreur lors de la suppression du Pokémon :', error.response.data);
  });



/*const axios = require('axios');

// URL de votre API pour mettre à jour un Pokémon
const updatePokemonUrl = 'http://localhost:3000/pokemons/Pikachu'; 

// Données mises à jour du Pokémon
const updatedPokemonData = {
  newName: 'Pikachu Updated',
  baseStats: {
    hp: 40,
    attack: 60,
    defense: 50,
    specialAttack: 60,
    specialDefense: 50,
    speed: 100,
  },
};

// Token d'authentification à inclure dans l'en-tête de la requête (si nécessaire)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmE2Nzk0Mzk1MzM0MDU5MDVhOTdlZSIsImlhdCI6MTY4OTk1MjkxNywiZXhwIjoxNjg5OTU2NTE3fQ.4caamM8QsK_xSYmHKY0PP835_IEmY7iAiVcSXPh3gYU'; // Remplacez par le token JWT obtenu lors de la connexion (si votre API nécessite l'authentification)

// Configurations pour inclure le token dans l'en-tête de la requête (si nécessaire)
const config = {
  headers: {
    Authorization: token,
  },
};

// Appel de la route pour mettre à jour un Pokémon avec Axios et le token d'authentification (si nécessaire)
axios.put(updatePokemonUrl, updatedPokemonData, config)
  .then(response => {
    console.log('Pokémon mis à jour :', response.data);
  })
  .catch(error => {
    console.error('Erreur lors de la mise à jour du Pokémon :', error.response.data);
  });

*/


/*
const axios = require("axios");

// URL de votre API pour créer un nouveau Pokémon
const createPokemonUrl = "http://localhost:3000/pokemons"; // Remplacez par votre URL

// Données du nouveau Pokémon à créer
const newPokemonData = {
  name: "Pikachu",
  createdBy: "64ba679439533405905a97ee",
  baseStats: {
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
  },
};


const config = {
    headers: {
      Authorization: token,
    },
  };

// Appel de la route pour créer un nouveau Pokémon avec Axios
axios
  .post(createPokemonUrl, newPokemonData, config)
  .then((response) => {
    console.log("Nouveau Pokémon créé :", response.data);
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la création du Pokémon :",
      error.response.data
    );
  });
*/