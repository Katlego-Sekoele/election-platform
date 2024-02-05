const mongoose = require('mongoose');
const { Schema } = mongoose;

class Party {
  // static to avoid creating a new instance for ever object
  static _schema = new mongoose.Schema({
    _id: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    name: {
      type: String,
      required: true,
      lowecase: true,
      trim: true,
      unique: 'That party name is already taken',
    },
    description: { type: String, trim: true },
    createdAt: { type: Schema.Types.Date, default: Date.now() },
    updatedAt: { type: Schema.Types.Date },
  });
  static model = mongoose.model('party', this._schema);

  party;

  constructor(party) {
    this.party = new this.model(party);
  }

  async save() {
    await this.party.save();
  }
}

module.exports = Party;
