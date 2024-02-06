const mongoose = require('mongoose');
const { Schema } = mongoose;
const Vote = require('./vote');

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
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'vote',
        autopopulate: {
          select: '-user', // Exclude the 'user' field to avoid circular reference
        },
      },
    ],
  }).plugin(require('mongoose-autopopulate'));

  static model = mongoose.model('user', User._schema);

  user;

  constructor(user) {
    this.user = new this.model(user);
  }

  async save() {
    await this.user.save();
  }

  static async findOneById(id) {
    const user = User.model.findOne({ _id: id }).populate('votes').exec();
    return user;
  }
}

module.exports = User;
