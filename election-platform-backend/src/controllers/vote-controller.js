const VoteModel = require('../models/vote');
const ElectionModel = require('../models/election');
const PartyModel = require('../models/party');

class Vote {
  static async createVote(req, res) {
    try {
      if (req.body.userId && req.body.partyId && req.body.electionId) {
        const { electionId, userId, partyId } = req.body;
        const election = await ElectionModel.findOneById(electionId);
        if (election === null) {
          res.status(404).json({ error: 'Election not found' });
        } else {
          if (!Boolean(election.parties.find((party) => party._id.toString() === partyId))) {
            res.status(400).json({ error: 'Party not found in election' });
          } else {
            // check if user has already voted
            const voteExists = await VoteModel.findVote(userId, electionId);

            if (voteExists) {
              res.status(400).json({ error: 'User has already voted' });
              return;
            } else {
              const vote = new VoteModel({ electionId, userId, partyId });
              const newVote = await vote.save();
              if (newVote) {
                res.status(201).json(newVote);
              } else {
                res.status(500).json({ error: 'Vote not created' });
              }
            }
          }
        }
      } else {
        res.status(400).json({ error: 'userId, partyId, and electionId are required' });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = Vote;
