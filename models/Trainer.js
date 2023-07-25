const mongoose = require('mongoose');

const TrainerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  profession: { type: String, required: true },
  pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }]
});

module.exports = mongoose.model('Trainer', TrainerSchema);
