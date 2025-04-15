// server/models/Tournament.js
const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
