'use strict';

const assert = require('chai').assert;
const axios = require('axios');

suite('Candidate API tests', function () {

  test('get candidates', async function () {
    const response = await axios.get('http://localhost:3000/api/candidates');
    const candidates = response.data;
    assert.equal(2, candidates.length);

    assert.equal(candidates[0].firstName, 'Lisa');
    assert.equal(candidates[0].lastName, 'Simpson');
    assert.equal(candidates[0].office, 'President');

    assert.equal(candidates[1].firstName, 'Donald');
    assert.equal(candidates[1].lastName, 'Simpson');
    assert.equal(candidates[1].office, 'President');
  });

  test('get one candidate', async function () {
    let response = await axios.get('http://localhost:3000/api/candidates');
    const candidates = response.data;
    assert.equal(2, candidates.length);

    const oneCandidateUrl = 'http://localhost:3000/api/candidates/' + candidates[0]._id;
    response = await axios.get(oneCandidateUrl);
    const oneCandidate = response.data;

    assert.equal(oneCandidate.firstName, 'Lisa');
    assert.equal(oneCandidate.lastName, 'Simpson');
    assert.equal(oneCandidate.office, 'President');
  });
});
