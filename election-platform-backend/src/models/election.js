const mongoose = require('mongoose');
const { Schema } = mongoose;

class Election {
  // static to avoid creating a new instance for ever object
  static _schema = new mongoose.Schema({
    _id: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    name: { type: String, required: true },
    type: { type: String, required: true },
    startDate: { type: Schema.Types.Date },
    endDate: { type: Schema.Types.Date },
    parties: [{ type: Schema.Types.ObjectId, ref: 'party' }],
    createdAt: { type: Schema.Types.Date, default: Date.now() },
    updatedAt: { type: Schema.Types.Date },
  });
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
