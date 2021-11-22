const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");

// authorization - validation-helper
function inputValidatedAndSanitized(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ description: errors.array() });
    }
    return next();
}

// hash password
async function hashUserPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

// check if the password is correct
async function comparePassword(given_pwd, correct_pwd) {
    return bcrypt.compare(given_pwd, correct_pwd);
}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({ description: 'User should log in first' });
    }
}

module.exports = {
    inputValidatedAndSanitized,
    hashUserPassword,
    comparePassword,
    checkAuthentication
}