const mongoose = require('mongoose');
const { Schema } = mongoose;

class Candidate {
  // static to avoid creating a new instance for ever object
  static _schema = new mongoose.Schema({
    _id: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String },
    bio: { type: String },
    createdAt: { type: Schema.Types.Date, default: Date.now() },
    updatedAt: { type: Schema.Types.Date },
  });
  // static to avoid creating a new instance for ever object
  static model = mongoose.model('candidate', this._schema);

  candidate;

  constructor(candidate) {
    this.candidate = new this.model(candidate);
  }

  async save() {
    await this.candidate.save();
  }
}

module.exports = Candidate;
