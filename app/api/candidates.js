'use strict';

const Candidate = require('../models/candidate');
const Boom = require('@hapi/boom');

const Candidates = {
  find: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const candidates = await Candidate.find();
      return candidates;
    }
  },
  findOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const candidate = await Candidate.findOne({ _id: request.params.id });
        if (!candidate) {
          return Boom.notFound('No Candidate with this id');
        }
        return candidate;
      } catch (err) {
        return Boom.notFound('No Candidate with this id');
      }
    }
  },
  create: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const newCandidate = new Candidate(request.payload);
      const candidate = await newCandidate.save();
      if (candidate) {
        return h.response(candidate).code(201);
      }
      return Boom.badImplementation('error creating candidate');
    }
  },
  deleteAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await Candidate.deleteMany({});
      return { success: true };
    }
  },
  deleteOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const response = await Candidate.deleteOne({ _id: request.params.id });
      if (response.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  }
};

module.exports = Candidates;
