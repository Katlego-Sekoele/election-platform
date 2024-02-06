const UserModel = require('../models/user');

class UserController {
  static async findUserById(request, response) {
    try {
      const { id } = request.params;
        const user = await UserModel.findOneById(id);
        const user2 = await UserModel.findOneById(id);
      console.log(user2);
      response.status(200).json(user2);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
