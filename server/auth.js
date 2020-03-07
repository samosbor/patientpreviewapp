const jwt = require("express-jwt")
const jwksRsa = require("jwks-rsa")
const dotenv = require('dotenv');
dotenv.config();

// Set up Auth0 configuration
const authConfig = {
  domain: "dev-7rrry9gm.auth0.com",
  audience: "patientpreview",
  management_audience: "https://dev-7rrry9gm.auth0.com/api/v2/",
  client_id: "s6R206lfciahPdn7N7Q7RRfAQsHKp2i6",
  client_secret: process.env.AUTH0_CLIENT_SECRET
}

module.exports = {
  authConfig: authConfig,
  // Create middleware to validate the JWT using express-jwt
  checkJwt: jwt({
    // Provide a signing key based on the key identifier in the header and the signing keys provided by your Auth0 JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),

    // Validate the audience (Identifier) and the issuer (Domain).
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ["RS256"]
  })
};