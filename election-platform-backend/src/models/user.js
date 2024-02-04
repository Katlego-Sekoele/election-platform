const mongoose = require('mongoose');
const { Schema } = mongoose;

class User {
  _schema = new mongoose.Schema({
    _id: {
      type: mongoose.SchemaTypes.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    authId: { type: String },
    username: { type: String },
    password: { type: String },
    roles: { type: [String], required: true, default: [] },
    identityNumber: { type: String },
    createdAt: { type: mongoose.SchemaTypes.Date, default: Date.now() },
    updatedAt: { type: mongoose.SchemaTypes.Date },
  });

  model = mongoose.model('user', this._schema);
  user;

  constructor(user) {
    this.user = new this.model(user);
  }

  async save() {
    await this.user.save();
  }
}

module.exports = User;
