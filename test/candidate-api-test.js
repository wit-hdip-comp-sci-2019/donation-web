'use strict';

const assert = require('chai').assert;
const axios = require('axios');

suite('Candidate API tests', function() {
  test('get candidates', async function() {
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

  test('get one candidate', async function() {
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

  test('create a candidate', async function() {
    const candidatesUrl = 'http://localhost:3000/api/candidates';
    const newCandidate = {
      firstName: 'Barnie',
      lastName: 'Grumble',
      office: 'President'
    };

    const response = await axios.post(candidatesUrl, newCandidate);
    const returnedCandidate = response.data;
    assert.equal(201, response.status);

    assert.equal(returnedCandidate.firstName, 'Barnie');
    assert.equal(returnedCandidate.lastName, 'Grumble');
    assert.equal(returnedCandidate.office, 'President');
  });

  test('delete a candidate', async function() {
    let response = await axios.get('http://localhost:3000/api/candidates');
    let candidates = response.data;
    const originalSize = candidates.length;

    const oneCandidateUrl = 'http://localhost:3000/api/candidates/' + candidates[0]._id;
    response = await axios.get(oneCandidateUrl);
    const oneCandidate = response.data;
    assert.equal(oneCandidate.firstName, 'Lisa');

    response = await axios.delete('http://localhost:3000/api/candidates/' + candidates[0]._id);
    assert.equal(response.data.success, true);

    response = await axios.get('http://localhost:3000/api/candidates');
    candidates = response.data;
    assert.equal(candidates.length, originalSize - 1);
  });

  test('delete all candidates', async function() {
    let response = await axios.get('http://localhost:3000/api/candidates');
    let candidates = response.data;
    const originalSize = candidates.length;
    assert(originalSize > 0);
    response = await axios.delete('http://localhost:3000/api/candidates');
    response = await axios.get('http://localhost:3000/api/candidates');
    candidates = response.data;
    assert.equal(candidates.length, 0);
  });
});
