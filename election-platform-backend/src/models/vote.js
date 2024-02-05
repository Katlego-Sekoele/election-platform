const mongoose = require('mongoose');
const { Schema } = mongoose;

class Vote {
  // static to avoid creating a new instance for ever object
  static _schema = new mongoose.Schema({
    _id: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    createdAt: { type: Schema.Types.Date, default: Date.now() },
    updatedAt: { type: Schema.Types.Date },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    party: { type: Schema.Types.ObjectId, ref: 'vote' },
  });
  static model = mongoose.model('vote', this._schema);

  vote;

  constructor(vote) {
    this.vote = new this.model(vote);
  }

  async save() {
    await this.vote.save();
  }
}

module.exports = Vote;
