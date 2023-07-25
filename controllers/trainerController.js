const Trainer = require('../models/Trainer');

//get all trainers
exports.getAllTrainers = (req, res) => {
  Trainer.find()
    .then((trainers) => res.json(trainers))
    .catch((err) => res.status(500).json({ error: err }));
};

//get trainer by name
exports.getTrainer = (req, res) => {
  Trainer.findOne({ name: req.params.name })
    .then((trainer) => res.json(trainer))
    .catch((err) => res.status(500).json({ error: err }));
};

//add trainer
exports.addTrainer = (req, res) => {
  // Récupérer les données du Pokémon à partir du corps de la requête
  const { name, createdBy, baseStats } = req.body;
  // si  name contient un caractère qui ne convient pas pour un url on annule la requête
  if (name.includes(" ")) {
    return res
      .status(400)
      .json({ error: "Le nom du dresseur ne doit pas contenir d'espace" });
  }
  const newTrainer = new Trainer(req.body);

  newTrainer.save()
    .then((savedTrainer) => res.json(savedTrainer))
    .catch((err) => res.status(500).json({ error: err }));
};

// Contrôleur pour mettre à jour un dresseur
exports.updateTrainer = (req, res) => {
  // récupérer le newName dans le corps de la requête
  const { newName } = req.body;
  // si new name contient un caractère qui ne convient pas pour un url on annule la requête
  if (newName.includes(" ")) {
    return res
      .status(400)
      .json({ error: "Le nom du dresseur ne doit pas contenir d'espace" });
  }
  Trainer.findOneAndUpdate({ name: req.params.name }, req.body, { new: true })
    .then((updatedTrainer) => res.json(updatedTrainer))
    .catch((err) => res.status(500).json({ error: err }));
};


exports.deleteTrainer = (req, res) => {
  Trainer.findOneAndDelete({ name: req.params.name })
    .then(() => res.json({ message: 'Trainer deleted successfully' }))
    .catch((err) => res.status(500).json({ error: err }));
};
