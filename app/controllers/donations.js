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
      const data = request.payload;
      var donorEmail = request.auth.credentials.id;
      data.donor = this.users[donorEmail];
      this.donations.push(data);
      return h.redirect('/report');
    }
  }
};

module.exports = Donations;
