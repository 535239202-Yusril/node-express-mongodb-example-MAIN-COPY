const usersRepository = require('./users-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await usersRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

//TUGAS 1

/**
 * Check if an email already exists
 * @param {string} email - Email to check
 * @returns {Promise<boolean>} - True if email exists, false otherwise
 */
async function isEmailTaken(email) {
  return await usersRepository.emailExists(email);
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  isEmailTaken, // Add this line to export the isEmailTaken function
};

//TUGAS 3
/**
 * Change user's password
 * @param {string} id - User ID
 * @param {string} oldPassword - Old password
 * @param {string} newPassword - New password
 * @param {string} confirmPassword - Confirm new password
 * @returns {boolean}
 */
// Fungsi untuk memeriksa apakah password cocok dengan password yang disimpan di database
async function checkPassword(id, password) {
  const user = await usersRepository.getUser(id);
  if (!user) {
    return false; // Pengguna tidak ditemukan
  }
  return passwordMatched(password, user.password);
}
async function changePassword(id, oldPassword, newPassword, confirmPassword) {
  const user = await usersRepository.getUser(id);
  if (!user) return false;
  if (!passwordMatched(oldPassword, user.password)) return false;
  if (newPassword !== confirmPassword) return false;

  try {
    await usersRepository.updatePassword(id, newPassword);
    return true;
  } catch (error) {
    console.error('Error changing password:', error);
    return false;
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  isEmailTaken,
  changePassword,
  checkPassword,
};
