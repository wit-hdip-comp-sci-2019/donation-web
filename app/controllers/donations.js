'use strict';

const Donation = require('../models/donation');
const User = require('../models/user');
const Candidate = require('../models/candidate');
const Joi = require('@hapi/joi');

const Donations = {
  home: {
    handler: async function(request, h) {
      const candidates = await Candidate.find().lean();
      return h.view('home', { title: 'Make a Donation', candidates: candidates });
    }
  },
  report: {
    handler: async function(request, h) {
      try {
        const donations = await Donation.find()
          .populate('donor')
          .populate('candidate')
          .lean();
        let total = 0;
        donations.forEach(donation => {
          total += donation.amount;
        });
        return h.view('report', {
          title: 'Donations to Date',
          donations: donations,
          total: total
        });
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },
  donate: {
    validate: {
      payload: {
        amount: Joi.number().required(),
        method: Joi.string().required(),
        candidate: Joi.string().required()
      },
      options: {
        abortEarly: false
      },
      failAction: async function(request, h, error) {
        const candidates = await Candidate.find().lean();
        return h
          .view('home', {
            title: 'Invalid Donation',
            candidates: candidates,
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;

        const rawCandidate = request.payload.candidate.split(',');
        const candidate = await Candidate.findOne({
          lastName: rawCandidate[0],
          firstName: rawCandidate[1]
        });

        const newDonation = new Donation({
          amount: data.amount,
          method: data.method,
          donor: user._id,
          candidate: candidate._id
        });
        await newDonation.save();
        return h.redirect('/report');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  }
};

module.exports = Donations;
