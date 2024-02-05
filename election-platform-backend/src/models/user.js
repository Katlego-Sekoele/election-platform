const mongoose = require('mongoose');
const { Schema } = mongoose;

class User {
  // static to avoid creating a new instance for ever object
  static _schema = new mongoose.Schema({
    _id: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    authId: { type: String },
    username: {
      type: String,
      lowecase: true,
      trim: true,
      unique: 'That username is already taken',
    },
    password: { type: String },
    roles: { type: [String], required: true, default: [], trim: true, lowecase: true },
    identityNumber: { type: String },
    createdAt: { type: Schema.Types.Date, default: Date.now() },
    updatedAt: { type: Schema.Types.Date },
    votes: [{ type: Schema.Types.ObjectId, ref: 'vote' }],
  });
  static model = mongoose.model('user', this._schema);

  user;

  constructor(user) {
    this.user = new this.model(user);
  }

  async save() {
    await this.user.save();
  }
}

module.exports = User;
