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

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmE2Nzk0Mzk1MzM0MDU5MDVhOTdlZSIsImlhdCI6MTY4OTk0NzE1NSwiZXhwIjoxNjg5OTUwNzU1fQ.qnh3mrb-nV0d7JabuFReNxvcLBOUOQImZGm5CQSLkJU'; // Remplacez par le token JWT obtenu lors de la connexion
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
