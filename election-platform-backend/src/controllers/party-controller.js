const PartyModel = require('../models/party');

class Party {
  static async createParty(request, response) {
    try {
      const party = new PartyModel({
        name: request.body.name,
        description: request.body.description,
      });
      const newParty = await party.save();
      if (newParty) {
        response.status(201).json(newParty);
      } else {
        response.status(500).json({ error: 'Party not created' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async getParties(_request, response) {
    try {
      const parties = await PartyModel.findAll();
      if (parties) {
        response.status(200).json(parties);
      } else {
        response.status(404).json({ error: 'Parties not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async getPartyById(request, response) {
    try {
      const { id } = request.params;
      const party = await PartyModel.findOneById(id);
      if (party) {
        response.status(200).json(party);
      } else {
        response.status(404).json({ error: 'Party not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async updatePartyById(request, response) {
    try {
      const { id } = request.params;
      const update = {
        ...(request.body.name ? { name: request.body.name } : {}),
        ...(request.body.description ? { description: request.body.description } : {}),
      };
      const party = await PartyModel.findOneAndUpdateById(id, update);
      if (party) {
        response.status(200).json(party);
      } else {
        response.status(404).json({ error: 'Party not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async deletePartyById(request, response) {
    try {
      const { id } = request.params;
      const party = await PartyModel.setDeletedAt(id);
      if (party) {
        response.status(204).json(party);
      } else {
        response.status(404).json({ error: 'Party not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async addCandidateToParty(request, response) {
    try {
      const partyId = request.params.id;
      const candidateId = request.body.id;
      const party = await PartyModel.addCandidateById(partyId, candidateId);
      if (party) {
        response.status(201).json(party);
      } else {
        response.status(500).json({ error: 'Candidate not added to party' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async removeCandidateFromParty(request, response) {
    try {
      const { id, candidateId } = request.params;
      const party = await PartyModel.deleteCandidateById(id, candidateId);
      if (party) {
        response.status(204).json(party);
      } else {
        response.status(404).json({ error: 'Candidate not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = Party;
