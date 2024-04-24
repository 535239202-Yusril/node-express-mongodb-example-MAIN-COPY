const { User } = require('../../../models');
const { passwordMatched, hashPassword } = require('../../../utils/password'); // Import passwordMatched dan hashPassword

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

//Tugas 1
/**
 * Check email jika ada di database
 * @param {string} email - Email yg di check
 * @returns {Promise<boolean>}
 */
async function emailExists(email) {
  const existingUser = await User.findOne({ email });
  return !!existingUser;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  emailExists,
};

//TUGAS 3
/**
 /**
 * Update user's password
 * @param {string} id - User ID
 * @param {string} newPassword - New password
 * @returns {Promise}
 */
async function updatePassword(id, newPassword) {
  const hashedPassword = await hashPassword(newPassword);
  return User.findByIdAndUpdate(id, { password: hashedPassword });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  emailExists,
  updatePassword,
};
