const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const EXPIRES = process.env.JWT_EXPIRES || '30d';

const signToken = (id) => jwt.sign({ id }, SECRET, { expiresIn: EXPIRES });
const verifyToken = (token) => jwt.verify(token, SECRET);

module.exports = { signToken, verifyToken };
