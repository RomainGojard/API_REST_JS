const Pokemon = require("../models/Pokemon");

exports.getAllPokemons = (req, res) => {
  Pokemon.find()
    .then((pokemons) => res.json(pokemons))
    .catch((err) => res.status(500).json({ error: err }));
};

exports.getPokemon = (req, res) => {
  Pokemon.findOne({ name: req.params.name })
    .then((pokemon) => res.json(pokemon))
    .catch((err) => res.status(500).json({ error: err }));
};

exports.addPokemon = (req, res) => {
  const { name, createdBy, baseStats } = req.body;

  if (name.includes(" ")) {
    return res
      .status(400)
      .json({ error: "The Pokemon name should not contain a space" });
  }

  const newPokemon = new Pokemon({
    name,
    createdBy,
    baseStats,
  });

  newPokemon
    .save()
    .then((savedPokemon) => {
      res.json(savedPokemon);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error creating the Pokemon" });
    });
};

exports.updatePokemon = (req, res) => {
  const { name } = req.params;
  const { newName, baseStats, modifiedBy } = req.body;

  if (newName.includes(" ")) {
    return res
      .status(400)
      .json({ error: "The Pokemon name should not contain a space" });
  }

  Pokemon.findOne({ name })
    .then((pokemon) => {
      if (!pokemon) {
        return res.status(404).json({ error: "Pokemon not found" });
      }

      pokemon.name = newName;
      pokemon.baseStats = baseStats;
      pokemon.modifiedBy = modifiedBy;

      return pokemon.save();
    })
    .then((updatedPokemon) => {
      res.json(updatedPokemon);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Error updating the Pokemon" });
    });
};

exports.deletePokemon = async (req, res) => {
  const { name } = req.params;

  try {
    const pokemon = await Pokemon.findOne({ name });
    if (!pokemon) {
      return res.status(404).json({ error: "Pokemon not found" });
    }

    await Pokemon.deleteOne(pokemon);

    res.json({ message: "Pokemon deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting Pokemon" });
  }
};
