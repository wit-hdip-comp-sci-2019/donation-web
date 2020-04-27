'use strict';

const assert = require('chai').assert;
const DonationService = require('./donation-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Donation API tests', function() {
  let donations = fixtures.donations;
  let newCandidate = fixtures.newCandidate;
  let newUser = fixtures.newUser;

  const donationService = new DonationService(fixtures.donationService);

  suiteSetup(async function() {
    await donationService.deleteAllUsers();
    const returnedUser = await donationService.createUser(newUser);
    const response = await donationService.authenticate(newUser);
  });

  suiteTeardown(async function() {
    await donationService.deleteAllUsers();
    donationService.clearAuth();
  });

  setup(async function() {
    donationService.deleteAllCandidates();
    donationService.deleteAllDonations();
  });

  teardown(async function() {});

  test('create a donation', async function() {
    const returnedCandidate = await donationService.createCandidate(newCandidate);
    await donationService.makeDonation(returnedCandidate._id, donations[0]);
    const returnedDonations = await donationService.getDonations(returnedCandidate._id);
    console.log(returnedDonations);
    assert.equal(returnedDonations.length, 1);
    assert(_.some([returnedDonations[0]], donations[0]), 'returned donation must be a superset of donation');
  });

  test('create multiple donations', async function() {
    const returnedCandidate = await donationService.createCandidate(newCandidate);
    for (var i = 0; i < donations.length; i++) {
      await donationService.makeDonation(returnedCandidate._id, donations[i]);
    }

    const returnedDonations = await donationService.getDonations(returnedCandidate._id);
    assert.equal(returnedDonations.length, donations.length);
    for (var i = 0; i < donations.length; i++) {
      assert(_.some([returnedDonations[i]], donations[i]), 'returned donation must be a superset of donation');
    }
  });

  test('delete all donations', async function() {
    const returnedCandidate = await donationService.createCandidate(newCandidate);
    for (var i = 0; i < donations.length; i++) {
      await donationService.makeDonation(returnedCandidate._id, donations[i]);
    }

    const d1 = await donationService.getDonations(returnedCandidate._id);
    assert.equal(d1.length, donations.length);
    await donationService.deleteAllDonations();
    const d2 = await donationService.getDonations(returnedCandidate._id);
    assert.equal(d2.length, 0);
  });
});
