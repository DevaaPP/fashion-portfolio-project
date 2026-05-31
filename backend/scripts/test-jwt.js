// Simple local test for JWT sign/verify
require('dotenv').config();
const { signToken, verifyToken } = require('../config/jwt');

const run = async () => {
  const testId = 'local-test-user-id-0001';
  const token = signToken(testId);
  console.log('\nSIGNED TOKEN:\n', token, '\n');

  const decoded = verifyToken(token);
  console.log('DECODED PAYLOAD:\n', decoded, '\n');
};

run().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
