const mongoose = require('mongoose');


const PokemonSchema = new mongoose.Schema({
   name: { type: String, required: true, unique: true },
   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   createdOn: { type: Date, default: Date.now },
   modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   modifedOn: { type: Date, default: Date.now },
   baseStats: {
        hp: { type: Number, required: true },
        attack: { type: Number, required: true },
        defense: { type: Number, required: true },
        specialAttack: { type: Number, required: true },
        specialDefense: { type: Number, required: true },
        speed: { type: Number, required: true },
    },
});

//si le pokemon est modifié, on met à jour la date de modification
PokemonSchema.pre('save', async function(next) {
    if (this.isModified()) {
        this.modifiedOn = Date.now();
    }
    next();
});
module.exports = mongoose.model('Pokemon', PokemonSchema);
