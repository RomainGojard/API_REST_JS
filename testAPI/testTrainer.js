const axios = require('axios');

const baseUrl = 'http://localhost:3000';
const credentials = {
  email: 'john.doe@example.com',
  password: 'securePassword'
};

let token;
let createdPokemons = [];

function login() {
  return axios
    .post(`${baseUrl}/auth/login`, credentials)
    .then((response) => {
      console.log('User login successfully:', response.data);
      token = response.data.token;
    });
}

function createPokemon(name) {
    const newPokemonData = {
      name: name,
      createdBy: '64ba679439533405905a97ee',
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
  
    // Check if the Pokemon already exists
    return axios
      .get(`${baseUrl}/pokemons/${name}`, config)
      .then((response) => {
        if (response.data) {
          console.log(`Pokemon ${name} already exists.`);
          createdPokemons.push(response.data._id);
        } else {
          // If the Pokemon does not exist, create it
          return axios
            .post(`${baseUrl}/pokemons`, newPokemonData, config)
            .then((response) => {
              console.log(`Pokemon ${name} created:`, response.data);
              createdPokemons.push(response.data._id);
            });
        }
      });
  }
  

function createTrainer() {
  const newTrainerData = {
    name: 'Ash2',
    profession: 'Pokemon Trainer',
    pokemons: [],
  };

  const config = {
    headers: {
      Authorization: token,
    },
  };

  return axios
    .post(`${baseUrl}/trainers`, newTrainerData, config)
    .then((response) => {
      console.log('Trainer created:', response.data);
    })
    .catch((error) => {
        console.error('Error creating trainer:', error.response ? error.response.data : error.message);
      });
}

function getAllTrainers() {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  return axios
    .get(`${baseUrl}/trainers`, config)
    .then((response) => {
      console.log('All trainers:', response.data);
    });
}

function getTrainerByName() {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  return axios
    .get(`${baseUrl}/trainers/Ash`, config)
    .then((response) => {
      console.log('Trainer Ash:', response.data);
    });
}

function updateTrainer() {
  const updatedTrainerData = {
    newName: 'AshKetchum',
    profession: 'Pokemon Master',
    pokemons: createdPokemons,
  };

  const config = {
    headers: {
      Authorization: token,
    },
  };

  return axios
    .put(`${baseUrl}/trainers/Ash`, updatedTrainerData, config)
    .then((response) => {
      console.log('Trainer updated:', response.data);
    });
}

function deleteTrainer() {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  return axios
    .delete(`${baseUrl}/trainers/AshKetchum`, config)
    .then((response) => {
      console.log('Trainer deleted:', response.data);
    });
}

// Run the tests
login()
  .then(() => Promise.all([
    createPokemon('Squirtle'),
    createPokemon('Bulbasaur'),
    createPokemon('Charmander'),
  ]))
  .then(createTrainer)
  .then(getAllTrainers)
  .then(getTrainerByName)
  .then(updateTrainer)
  .then(deleteTrainer)
  .catch((error) => {
    console.error('Error:', error.response ? error.response.data : error.message);
  });
