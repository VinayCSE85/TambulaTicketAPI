const User = require('../models/userModel');

class UserDAO {
    async createUser(userData) {
        const user = new User(userData);
        await user.save();
        return user;
    }
    async findByUsername(username) {
        const user = await User.findOne({ username }).exec();
        return user;
    }
    async getAllUsers() {
        try {
            const users = await User.find({}, { password: 0 }).exec();
            return users;
        } catch (error) {
            throw new Error('Failed to get users');
        }
    }

    async getUserById(userId) {
        try {
            const user = await User.findById(userId, { password: 0 }).exec();
            return user;
        } catch (error) {
            throw new Error('Failed to get user');
        }
    }
}

module.exports = UserDAO;
