'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const donationSchema = new Schema({
  amount: Number,
  method: String
});

module.exports = Mongoose.model('Donation', donationSchema);
