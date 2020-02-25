'use strict';

const Donation = require('../models/donation');
const User = require('../models/user');
const Candidate = require('../models/candidate');

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
        const donations = await Donation.find().populate('donor').populate('candidate').lean();
        return h.view('report', {
          title: 'Donations to Date',
          donations: donations
        });
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },
  donate: {
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
