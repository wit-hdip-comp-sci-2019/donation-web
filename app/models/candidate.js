'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const candidateSchema = Schema({
  firstName: String,
  lastName: String,
  office: String,
});

module.exports = Mongoose.model('Candidate', candidateSchema);