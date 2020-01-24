const Donations = require('./app/controllers/donations');

module.exports = [
  { method: 'GET', path: '/', config: Donations.index },
  { method: 'GET', path: '/signup', config: Donations.signup },
  { method: 'GET', path: '/login', config: Donations.login },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './public'
      }
    }
  }
];
