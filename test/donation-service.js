'use strict';

const axios = require('axios');
const baseUrl = 'http://localhost:3000';

class DonationService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getCandidates() {
    const response = await axios.get(this.baseUrl + '/api/candidates');
    return response.data;
  }

  async getCandidate(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/candidates/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createCandidate(newCandidate) {
    const response = await axios.post(this.baseUrl + '/api/candidates', newCandidate);
    return response.data;
  }

  async deleteAllCandidates() {
    const response = await axios.delete(this.baseUrl + '/api/candidates');
    return response.data;
  }

  async deleteOneCandidate(id) {
    const response = await axios.delete(this.baseUrl + '/api/candidates/' + id);
    return response.data;
  }

  async getUsers() {
    const response = await axios.get(this.baseUrl + '/api/users');
    return response.data;
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/user/' + id);
      return response.data;
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    const response = await axios.post(this.baseUrl + '/api/users', newUser);
    return response.data;
  }

  async deleteAllCandidates() {
    const response = await axios.delete(this.baseUrl + '/api/candidates');
    return response.data;
  }

  async deleteOneCandidate(id) {
    const response = await axios.delete(this.baseUrl + '/api/candidates/' + id);
    return response.data;
  }
}

module.exports = DonationService;
