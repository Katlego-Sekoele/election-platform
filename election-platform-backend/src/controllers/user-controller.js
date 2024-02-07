const UserModel = require('../models/user');

class UserController {
  static async findUserById(request, response) {
    try {
      const { id } = request.params;
      const user = await UserModel.findOneById(id);
      response.status(200).json(user);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async createUser(request, response) {
    try {
      //find user by username
      const foundUser = await UserModel.findOneByUsername(request.body.username);
      if (foundUser) {
        return response.status(400).json({ error: 'Username already exists' });
      } else {
        let user = new UserModel({
          username: request.body.username,
          password: request.body.password,
          ...(request.body.roles ? { roles: request.body.roles } : {}),
          identityNumber: request.body.identityNumber,
        });
        user = await user.save();
        if (user) {
          response.status(201).json(user);
        } else {
          response.status(500).json({ error: 'User not created' });
        }
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async updateUserById(request, response) {
    try {
      const { id } = request.params;
      const user = await UserModel.findOneAndUpdateById(id, request.body);
      if (user) {
        response.status(200).json(user);
      } else {
        response.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async deleteUserById(request, response) {
    try {
      const { id } = request.params;
      const deletedUser = await UserModel.setDeletedAt(id);
      if (deletedUser) {
        response.status(204).json({ message: 'User deleted successfully' });
      } else {
        response.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
