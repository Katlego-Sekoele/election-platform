const mongoose = require('mongoose');
const { Schema } = mongoose;

class Candidate {
  // static to avoid creating a new instance for ever object
  static _schema = new mongoose.Schema({
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String },
    bio: { type: String },
    createdAt: { type: Schema.Types.Date, default: Date.now() },
    updatedAt: { type: Schema.Types.Date },
    deletedAt: { type: Schema.Types.Date },
  });
  // static to avoid creating a new instance for ever object
  static model = mongoose.model('candidate', this._schema);

  candidate;

  constructor(candidate) {
    this.candidate = new Candidate.model(candidate);
  }

  async save() {
    return await this.candidate.save();
  }

  static async findAll() {
    return Candidate.model.find({ deletedAt: { $exists: false } }).exec();
  }

  static async findById(id) {
    return Candidate.model.findOne({ _id: id, deletedAt: { $exists: false } }).exec();
  }

  static async findOneAndUpdateById(id, update) {
    update.updatedAt = new Date();
    return Candidate.model
      .findOneAndUpdate({ _id: id, deletedAt: { $exists: false } }, { $set: update }, { new: true })
      .exec();
  }

  static async setDeletedAt(id) {
    const candidate = await Candidate.findById(id);
    if (candidate !== null) {
      return Candidate.model
        .findOneAndUpdate(
          { _id: id, deletedAt: { $exists: false } },
          { $set: { deletedAt: new Date() } },
          { new: true },
        )
        .exec();
    } else {
      return null;
    }
  }
}

module.exports = Candidate;
