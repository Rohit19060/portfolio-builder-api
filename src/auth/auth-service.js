const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const knex = require("knex");

const AuthService = {
  // Getting user from database based on username
  getUserWithUserName(db, user_name) {
    return db("portfolio_users").where({ user_name }).first();
  },

  parseBasicToken(token) {
    return Buffer.from(token, "base64").toString();
  },

  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },

  createJwt(subject, payload) {
    // Creating JWT Token with algo and payload
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: "HS256",
    });
  },

  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ["HS256"],
    });
  },
};

module.exports = AuthService;
