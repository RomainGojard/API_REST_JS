const axios = require("axios");
const baseUrl = "http://localhost:3000";
const userLoginData = {
  email: "chico@example.com",
  password: "securePassword",
};
const pokemonName = "Pichu";

let token;

function login() {
  return axios
    .post(`${baseUrl}/auth/login`, userLoginData)
    .then((response) => {
      console.log("User login successfully:", response.data);
      token = response.data.token;
    });
}

function createPokemon() {
  const newPokemonData = {
    name: pokemonName,
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

  return axios
    .post(`${baseUrl}/pokemons`, newPokemonData, config)
    .then((response) => {
      console.log("New Pokemon created:", response.data);
    });
}

function getAllPokemons() {
  
  const config = {
    headers: {
      Authorization: token,
    },
  };

  return axios
    .get(`${baseUrl}/pokemons`, config)
    .then((response) => {
      console.log("get all pokemons :", response.data);
    });
}

function getPokemon() {
  
  const config = {
    headers: {
      Authorization: token,
    },
  };

  return axios
    .get(`${baseUrl}/pokemons/${pokemonName}`, config)
    .then((response) => {
      console.log("get pokemon :", response.data);
    });
}

function updatePokemon() {
  const newName = pokemonName + "Updated";
  const updatedPokemonData = {
    newName: newName,
    baseStats: {
      hp: 40,
      attack: 60,
      defense: 50,
      specialAttack: 60,
      specialDefense: 50,
      speed: 100,
    },
  };

  const config = {
    headers: {
      Authorization: token,
    },
  };

  return axios
    .put(`${baseUrl}/pokemons/${pokemonName}`, updatedPokemonData, config)
    .then((response) => {
      console.log("Pokemon updated:", response.data);
    });
}

function deletePokemon() {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  return axios
    .delete(`${baseUrl}/pokemons/${pokemonName + 'Updated'}`, config)
    .then((response) => {
      console.log("Pokemon deleted:", response.data);
    });
}

// Run the tests
login()
  .then(createPokemon)
  .then(getAllPokemons)
  .then(getPokemon)
  .then(updatePokemon)
  .then(deletePokemon)
  .catch((error) => {
    console.error("Error:", error.response ? error.response.data : error.message);
  });
