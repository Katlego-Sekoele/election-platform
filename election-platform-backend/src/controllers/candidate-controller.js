const CandidateModel = require('../models/candidate');

class Candidate {
  static async createCandidate(request, response) {
    try {
      const candidate = new CandidateModel({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        bio: request.body.bio,
        position: request.body.position,
      });
      const newCandidate = await candidate.save();
      if (newCandidate) {
        response.status(201).json(newCandidate);
      } else {
        response.status(500).json({ error: 'Candidate not created' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async getCandidates(_request, response) {
    try {
      const candidates = await CandidateModel.findAll();
      if (candidates) {
        response.status(200).json(candidates);
      } else {
        response.status(404).json({ error: 'Candidates not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async getCandidateById(request, response) {
    try {
      const { id } = request.params;
      const candidate = await CandidateModel.findById(id);
      if (candidate) {
        response.status(200).json(candidate);
      } else {
        response.status(404).json({ error: 'Candidate not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async updateCandidateById(request, response) {
    try {
      const { id } = request.params;
      const update = {
        ...(request.body.firstName ? { firstName: request.body.firstName } : {}),
        ...(request.body.lastName ? { lastName: request.body.lastName } : {}),
        ...(request.body.bio ? { bio: request.body.bio } : {}),
        ...(request.body.position ? { position: request.body.position } : {}),
      };
      const candidate = await CandidateModel.findOneAndUpdateById(id, update);
      if (candidate) {
        response.status(200).json(candidate);
      } else {
        response.status(404).json({ error: 'Candidate not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async deleteCandidateById(request, response) {
    try {
      const { id } = request.params;
      const candidate = await CandidateModel.setDeletedAt(id);
      if (candidate) {
        response.status(204).json(candidate);
      } else {
        response.status(404).json({ error: 'Candidate not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = Candidate;
