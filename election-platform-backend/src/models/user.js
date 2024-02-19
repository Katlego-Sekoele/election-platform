const mongoose = require('mongoose');
const { Schema } = mongoose;
const Vote = require('./vote');

class User {
  static _schema = new mongoose.Schema({
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    authId: { type: String },
    username: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: { type: String },
    phone: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    roles: { type: [String], required: true, default: [], trim: true, lowercase: true },
    identityNumber: { type: String },
    createdAt: { type: Schema.Types.Date, default: Date.now() },
    updatedAt: { type: Schema.Types.Date },
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'vote',
        autopopulate: true,
      },
    ],
    deletedAt: { type: Schema.Types.Date },
  });

  static model = mongoose.model('user', User._schema.plugin(require('mongoose-autopopulate')));

  user;

  constructor(user) {
    this.user = new User.model(user);
  }

  async save() {
    return this.user.save();
  }

  static async findOneById(id) {
    const user = User.model.findOne({ _id: id, deletedAt: { $exists: false } }).exec();
    return user;
  }

  static async findAll() {
    const users = User.model.find({ deletedAt: { $exists: false } }).exec();
    return users;
  }

  static async findOneAndUpdateById(id, update) {
    update.updatedAt = new Date();
    const updatedUser = User.model
      .findOneAndUpdate({ _id: id }, { $set: update }, { new: true })
      .exec();
    return updatedUser;
  }

  static async findOneByUsername(username) {
    const user = User.model.findOne({ username: new RegExp(`^${username}$`, 'i') }).exec();
    return user;
  }

  static async findOneByAuthId(authId) {
    const user = User.model.findOne({ authId: authId }).exec();
    return user;
  }

  static async setDeletedAt(id) {
    const user = await User.findOneById(id);
    if (user === null) {
      return null;
    } else {
      return this.findOneAndUpdateById(id, { deletedAt: new Date() });
    }
  }
}

module.exports = User;
