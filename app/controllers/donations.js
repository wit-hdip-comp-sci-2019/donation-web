'use strict';

const Donations = {
  index: {
    handler: function(request, h) {
      return h.view('main', { title: 'Welcome to Donations' });
    }
  },
  signup: {
    handler: function(request, h) {
      return h.view('signup', { title: 'Sign up for Donations' });
    }
  },
  login: {
    handler: function(request, h) {
      return h.view('login', { title: 'Login to Donations' });
    }
  }
};

module.exports = Donations;
