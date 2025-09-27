const user = require("./schema/user.schema");

const UserRepository = {
  create: async (userData) => {
    const newUser = await user.create(user);
    newUser.save();
  },

  getUserById: async (id) => {
    const existingUser = await user.findById(id).exec();

    return existingUser;
  },

  getUserByFilter: async (query) => {
    const existingUser = await user.findOne({ ...query }).exec();

    return existingUser;
  },
};

module.exports = UserRepository;
