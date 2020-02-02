'use strict';

const Donation = require('../models/donation');

const Donations = {
  home: {
    handler: function(request, h) {
      return h.view('home', { title: 'Make a Donation' });
    }
  },
  report: {
    handler: async function(request, h) {
      const donations = await Donation.find().lean();
      return h.view('report', {
        title: 'Donations to Date',
        donations: donations
      });
    }
  },
  donate: {
    handler: async function(request, h) {
      const data = request.payload;
      const newDonation = new Donation({
        amount: data.amount,
        method: data.method
      });
      await newDonation.save();
      return h.redirect('/report');
    }
  }
};

module.exports = Donations;
