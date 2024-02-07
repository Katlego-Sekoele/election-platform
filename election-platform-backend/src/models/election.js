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
    votes: [{ type: Schema.Types.ObjectId, ref: 'vote' }],
  }).plugin(require('mongoose-autopopulate'));
  // static to avoid creating a new instance for ever object
  static model = mongoose.model('election', this._schema);

  election;

  constructor(election) {
    this.election = new this.model(election);
  }

  async save() {
    await this.election.save();
  }
}

module.exports = Election;
