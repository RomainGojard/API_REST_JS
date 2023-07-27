const Trainer = require('../models/Trainer');

// Get all trainers
exports.getAllTrainers = (req, res) => {
  Trainer.find()
    .then(trainers => res.json(trainers))
    .catch(err => res.status(500).json({ error: err }));
};

// Get trainer by name
exports.getTrainer = (req, res) => {
  Trainer.findOne({ name: req.params.name })
    .then(trainer => res.json(trainer))
    .catch(err => res.status(500).json({ error: err }));
};

// Add trainer
exports.addTrainer = (req, res) => {
  const { name } = req.body;

  if (name.includes(" ")) {
    return res.status(400).json({ error: "Trainer name should not contain spaces" });
  }

  const newTrainer = new Trainer(req.body);

  newTrainer.save()
    .then(savedTrainer => res.json(savedTrainer))
    .catch(err => res.status(500).json({ error: err }));
};

// Update trainer
exports.updateTrainer = (req, res) => {
  const { newName } = req.body;

  if (newName && newName.includes(" ")) {
    return res.status(400).json({ error: "Trainer name should not contain spaces" });
  }

  Trainer.findOneAndUpdate({ name: req.params.name }, req.body, { new: true })
    .then(updatedTrainer => res.json(updatedTrainer))
    .catch(err => res.status(500).json({ error: err }));
};

// Delete trainer
exports.deleteTrainer = (req, res) => {
  Trainer.findOneAndDelete({ name: req.params.name })
    .then(() => res.json({ message: 'Trainer deleted successfully' }))
    .catch(err => res.status(500).json({ error: err }));
};
