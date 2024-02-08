const mongoose = require('mongoose');
const { Schema } = mongoose;

class Election {
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
      unique: 'That election name is already taken',
    },
    type: { type: String, required: true },
    description: { type: String, trim: true, lowecase: true },
    startDate: { type: Schema.Types.Date },
    endDate: { type: Schema.Types.Date },
    parties: [{ type: Schema.Types.ObjectId, ref: 'party', autopopulate: { select: '-votes' } }],
    createdAt: { type: Schema.Types.Date, default: Date.now() },
    updatedAt: { type: Schema.Types.Date },
    votes: [{ type: Schema.Types.ObjectId, ref: 'vote', autopopulate: true }],
    deletedAt: { type: Schema.Types.Date },
  }).plugin(require('mongoose-autopopulate'));
  // static to avoid creating a new instance for ever object
  static model = mongoose.model('election', this._schema);

  election;

  constructor(election) {
    this.election = new Election.model(election);
  }

  async save() {
    return this.election.save();
  }

  static async findOneById(id) {
    return Election.model.findOne({ _id: id, deletedAt: { $exists: false } }).exec();
  }

  static async findAll() {
    return Election.model.find({ deletedAt: { $exists: false } }).exec();
  }

  static async findOneAndUpdateById(id, update) {
    return Election.model.findOneAndUpdate({ _id: id }, { $set: update }, { new: true }).exec();
  }

  static async setDeletedAt(id) {
    const election = await Election.findOneById(id);
    if (election !== null) {
      return Election.model
        .findOneAndUpdate({ _id: id }, { $set: { deletedAt: new Date() } })
        .exec();
    } else {
      return null;
    }
  }

  static async addPartyById(id, partyId) {
    const election = Election.model.findOneAndUpdate(
      { _id: id, deletedAt: { $exists: false } },
      { $addToSet: { parties: partyId } },
      { new: true },
    );
    return election;
  }

  static async deletePartyById(id, partyId) {
    const election = await Election.model.findOne({
      _id: id,
      parties: partyId,
      deletedAt: { $exists: false },
    });
    if (election === null) {
      return null;
    } else {
      return Election.model
        .findOneAndUpdate(
          { _id: id, deletedAt: { $exists: false } },
          { $pull: { parties: partyId } },
          { new: true },
        )
        .exec();
    }
  }
}

module.exports = Election;
