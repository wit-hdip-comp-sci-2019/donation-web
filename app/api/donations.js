'use strict';

const Donation = require('../models/donation');
const Boom = require('@hapi/boom');

const Donations = {
  findAll: {
    auth: false,
    handler: async function(request, h) {
      const donations = await Donation.find();
      return donations;
    }
  },
  findByCandidate: {
    auth: false,
    handler: async function(request, h) {
      const donations = await Donation.find({ candidate: request.params.id });
      return donations;
    }
  }
};

module.exports = Donations;
