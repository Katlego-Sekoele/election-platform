const mongoose = require('mongoose');
const { Schema } = mongoose;
const Vote = require('./vote');
const Candidate = require('./candidate');

class Party {
  // static to avoid creating a new instance for ever object
  static _schema = new mongoose.Schema({
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    name: {
      type: String,
      required: true,
      lowecase: true,
      trim: true,
      unique: true,
    },
    description: { type: String, trim: true },
    createdAt: { type: Schema.Types.Date, default: Date.now() },
    updatedAt: { type: Schema.Types.Date },
    candidates: [{ type: Schema.Types.ObjectId, ref: 'candidate', autopopulate: true }],
    votes: [{ type: Schema.Types.ObjectId, ref: 'vote' }],
    deletedAt: { type: Schema.Types.Date },
  }).plugin(require('mongoose-autopopulate'));

  static model = mongoose.model('party', Party._schema);

  party;

  constructor(party) {
    this.party = new Party.model(party);
  }

  async save() {
    return await this.party.save();
  }

  static async findAll() {
    return Party.model.find({ deletedAt: { $exists: false } }).exec();
  }

  static async findOneById(id) {
    const party = Party.model.findOne({ _id: id, deletedAt: { $exists: false } }).exec();
    return party;
  }

  static async findOneAndUpdateById(id, update) {
    update.updatedAt = new Date();
    const updatedParty = Party.model
      .findOneAndUpdate({ _id: id }, { $set: update }, { new: true })
      .exec();
    return updatedParty;
  }

  static async setDeletedAt(id) {
    const party = await Party.findOneById(id);
    if (party !== null) {
      return Party.model.findOneAndUpdate({ _id: id }, { $set: { deletedAt: new Date() } }).exec();
    } else {
      return null;
    }
  }

  static async addCandidateById(partyId, candidateId) {
    const party = await Party.findOneById(partyId);
    if (party !== null) {
      const updatedParty = await Party.model
        .findOneAndUpdate(
          {
            _id: partyId,
            deletedAt: { $exists: false },
          },
          {
            $push: { candidates: candidateId },
          },
          {
            new: true,
          },
        )
        .exec();
      return updatedParty;
    } else {
      return null;
    }
  }

  static async deleteCandidateById(partyId, candidateId) {
    const party = await Party.findOneById(partyId);
    if (party !== null) {
      const updatedParty = await Party.model
        .findOneAndUpdate(
          {
            _id: partyId,
            candidates: candidateId,
            deletedAt: { $exists: false },
          },
          {
            $pull: { candidates: candidateId },
          },
          {
            new: true,
          },
        )
        .exec();
      return updatedParty;
    } else {
      return null;
    }
  }
}

module.exports = Party;
