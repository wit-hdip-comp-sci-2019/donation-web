'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const donationSchema = new Schema({
  amount: Number,
  method: String,
  firstName: String,
  lastName: String
});

module.exports = Mongoose.model('Donation', donationSchema);
