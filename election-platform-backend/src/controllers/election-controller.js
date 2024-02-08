const ElectionModel = require('../models/election');
const PartyModel = require('../models/party');
class Election {
  static async createElection(request, response) {
    try {
      const election = new ElectionModel({
        name: request.body.name,
        description: request.body.description,
        type: request.body.type,
        startDate: new Date(request.body.startDate),
        endDate: new Date(request.body.endDate),
      });
      const newElection = await election.save();
      if (newElection) {
        response.status(201).json(newElection);
      } else {
        response.status(500).json({ error: 'Election not created' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async getElections(_request, response) {
    try {
      const elections = await ElectionModel.findAll();
      if (elections) {
        response.status(200).json(elections);
      } else {
        response.status(404).json({ error: 'Elections not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async getElectionById(request, response) {
    try {
      const { id } = request.params;
      const election = await ElectionModel.findOneById(id);
      if (election) {
        response.status(200).json(election);
      } else {
        response.status(404).json({ error: 'Election not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
  static async updateElectionById(request, response) {
    try {
      const { id } = request.params;
      const update = {
        ...(request.body.name ? { name: request.body.name } : {}),
        ...(request.body.description ? { description: request.body.description } : {}),
        ...(request.body.type ? { type: request.body.type } : {}),
        ...(request.body.startDate ? { startDate: new Date(request.body.startDate) } : {}),
        ...(request.body.endDate ? { endDate: new Date(request.body.endDate) } : {}),
      };
      const election = await ElectionModel.findOneAndUpdateById(id, update);
      if (election) {
        response.status(200).json(election);
      } else {
        response.status(404).json({ error: 'Election not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async deleteElectionById(request, response) {
    try {
      const { id } = request.params;
      const election = await ElectionModel.setDeletedAt(id);
      if (election) {
        response.status(204).json({ message: 'Election deleted successfully' });
      } else {
        response.status(404).json({ error: 'Election not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async addPartyToElection(request, response) {
    try {
      const electionId = request.params.id;
      const partyId = request.body.id;
      const election = await ElectionModel.findOneById(electionId);
      if (election) {
        const party = await PartyModel.findOneById(partyId);
        if (party) {
          const updatedElection = await ElectionModel.addPartyById(electionId, partyId);
          if (updatedElection) {
            response.status(201).json(updatedElection);
          } else {
            response.status(500).json({ error: 'Party not added to election' });
          }
        } else {
          response.status(404).json({ error: 'Party not found' });
        }
      } else {
        response.status(404).json({ error: 'Election not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async removePartyFromElection(request, response) {
    try {
      const { id, partyId } = request.params;
      const election = await ElectionModel.deletePartyById(id, partyId);
      if (election) {
        response.status(204).json({ message: 'Party removed from election' });
      } else {
        response.status(404).json({ error: 'Election or Party not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = Election;
