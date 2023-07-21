const Pokemon = require("../models/Pokemon");

exports.getAllPokemons = (req, res) => {
    Pokemon.find()
        .then((pokemons) => res.json(pokemons))
        .catch((err) => res.status(500).json({ error: err }));
};

//get pokemon by name
exports.getPokemon = (req, res) => {
    Pokemon.findOne({ name: req.params.name })
        .then((pokemon) => res.json(pokemon))
        .catch((err) => res.status(500).json({ error: err }));
};
