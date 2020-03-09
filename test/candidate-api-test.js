'use strict';

const assert = require('chai').assert;
const DonationService = require('./donation-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Candidate API tests', function () {

  let candidates = fixtures.candidates;
  let newCandidate = fixtures.newCandidate;

  const donationService = new DonationService('http://localhost:3000');

  setup(async function () {
    await donationService.deleteAllCandidates();
  });

  teardown(async function () {
    await donationService.deleteAllCandidates();
  });

  test('create a candidate', async function () {
    const returnedCandidate = await donationService.createCandidate(newCandidate);
    assert(_.some([returnedCandidate], newCandidate), 'returnedCandidate must be a superset of newCandidate');
    assert.isDefined(returnedCandidate._id);
  });

  test('get candidate', async function () {
    const c1 = await donationService.createCandidate(newCandidate);
    const c2 = await donationService.getCandidate(c1._id);
    assert.deepEqual(c1, c2);
  });

  test('get invalid candidate', async function () {
    const c1 = await donationService.getCandidate('1234');
    assert.isNull(c1);
    const c2 = await donationService.getCandidate('012345678901234567890123');
    assert.isNull(c2);
  });


  test('delete a candidate', async function () {
    let c = await donationService.createCandidate(newCandidate);
    assert(c._id != null);
    await donationService.deleteOneCandidate(c._id);
    c = await donationService.getCandidate(c._id);
    assert(c == null);
  });

  test('get all candidates', async function () {
    for (let c of candidates) {
      await donationService.createCandidate(c);
    }

    const allCandidates = await donationService.getCandidates();
    assert.equal(allCandidates.length, candidates.length);
  });

  test('get candidates detail', async function () {
    for (let c of candidates) {
      await donationService.createCandidate(c);
    }

    const allCandidates = await donationService.getCandidates();
    for (var i = 0; i < candidates.length; i++) {
      assert(_.some([allCandidates[i]], candidates[i]), 'returnedCandidate must be a superset of newCandidate');
    }
  });

  test('get all candidates empty', async function () {
    const allCandidates = await donationService.getCandidates();
    assert.equal(allCandidates.length, 0);
  });

});
