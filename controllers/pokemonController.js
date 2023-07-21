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
  
    // Créer une instance du modèle Pokémon avec les données fournies
    const newPokemon = new Pokemon({
      name,
      createdBy,
      baseStats,
    });
  
    // Enregistrer le nouveau Pokémon dans la base de données
    newPokemon.save()
      .then(savedPokemon => {
        // En cas de succès, renvoyer le Pokémon créé en réponse
        res.json(savedPokemon);
      })
      .catch(error => {
        // En cas d'erreur, renvoyer un message d'erreur en réponse
        res.status(500).json({ error: 'Erreur lors de la création du Pokémon' });
      });
  };
