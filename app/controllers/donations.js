'use strict';

const Donations = {
  home: {
    handler: function(request, h) {
      return h.view('home', { title: 'Make a Donation' });
    }
  },
  report: {
    handler: function(request, h) {
      return h.view('report', {
        title: 'Donations to Date',
        donations: this.donations
      });
    }
  },
  donate: {
    handler: function(request, h) {
      let data = request.payload;
      data.donor = this.currentUser;
      this.donations.push(data);
      return h.redirect('/report');
    }
  }
};

module.exports = Donations;
