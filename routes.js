const Donations = require('./app/controllers/donations');

module.exports = [{ method: 'GET', path: '/', config: Donations.index }];
