'use strict';

const Donations = {
  home: {
    handler: function(request, h) {
      return h.view('home', { title: 'Make a Donation' });
    }
  },
  report: {
    handler: function(request, h) {
      return h.view('report', { title: 'Donations so far' });
    }
  }
};

module.exports = Donations;
