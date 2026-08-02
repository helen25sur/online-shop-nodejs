const { csrfSync } = require('csrf-sync');

const {
  generateToken,
  csrfSynchronisedProtection,
  invalidCsrfTokenError,
} = csrfSync({
  getTokenFromRequest: (req) => req.body._csrf
});

module.exports = { generateToken, csrfSynchronisedProtection, invalidCsrfTokenError };