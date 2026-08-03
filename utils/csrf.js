const { csrfSync } = require('csrf-sync');

const {
  generateToken,
  csrfSynchronisedProtection,
  invalidCsrfTokenError,
} = csrfSync({
  getTokenFromRequest: (req) => req.body?._csrf || req.headers['csrf-token']
});

module.exports = { generateToken, csrfSynchronisedProtection, invalidCsrfTokenError };