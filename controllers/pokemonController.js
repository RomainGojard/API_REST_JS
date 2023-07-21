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

//add pokemon
exports.addPokemon = (req, res) => {
  // Récupérer les données du Pokémon à partir du corps de la requête
  const { name, createdBy, baseStats } = req.body;
  // si  name contient un caractère qui ne convient pas pour un url on annule la requête
  if (name.includes(" ")) {
    return res
      .status(400)
      .json({ error: "Le nom du Pokémon ne doit pas contenir d'espace" });
  }

  // Créer une instance du modèle Pokémon avec les données fournies
  const newPokemon = new Pokemon({
    name,
    createdBy,
    baseStats,
  });

  // Enregistrer le nouveau Pokémon dans la base de données
  newPokemon
    .save()
    .then((savedPokemon) => {
      // En cas de succès, renvoyer le Pokémon créé en réponse
      res.json(savedPokemon);
    })
    .catch((error) => {
      // En cas d'erreur, renvoyer un message d'erreur en réponse
      res.status(500).json({ error: "Erreur lors de la création du Pokémon" });
    });
};

// Contrôleur pour mettre à jour un Pokémon
exports.updatePokemon = (req, res) => {
  const { name } = req.params; // Récupérer l'ID du Pokémon à mettre à jour depuis les paramètres de la requête
  const { newName, baseStats, modifiedBy } = req.body; // Récupérer les nouvelles données du Pokémon depuis le corps de la requête

  // si new name contient un caractère qui ne convient pas pour un url on annule la requête
  if (newName.includes(" ")) {
    return res
      .status(400)
      .json({ error: "Le nom du Pokémon ne doit pas contenir d'espace" });
  }

  // Rechercher le Pokémon dans la base de données par son nom
  Pokemon.findOne({ name })
    .then((pokemon) => {
      if (!pokemon) {
        return res.status(404).json({ error: "Pokémon non trouvé" });
      }
      // Mettre à jour les informations du Pokémon avec les nouvelles données
      pokemon.name = newName;
      pokemon.baseStats = baseStats;
      pokemon.modifiedBy = modifiedBy;

      // Enregistrer les modifications dans la base de données
      return pokemon.save();
    })
    .then((updatedPokemon) => {
      // En cas de succès, renvoyer le Pokémon mis à jour en réponse
      res.json(updatedPokemon);
    })
    .catch((error) => {
      // En cas d'erreur, renvoyer un message d'erreur en réponse
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour du Pokémon" });
    });
};

exports.deletePokemon = async (req, res) => {
  const { name } = req.params;

  try {
    // Vérifier si le Pokémon existe
    const pokemon = await Pokemon.findOne({ name });
    if (!pokemon) {
      return res.status(404).json({ error: "Pokémon not found" });
    }

    // Supprimer le Pokémon de la base de données
    await Pokemon.deleteOne(pokemon);

    res.json({ message: "Pokémon deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting Pokémon" });
  }
};
