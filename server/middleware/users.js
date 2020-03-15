const jwt = require('jsonwebtoken')
module.exports = {
  validateRegister: (req, res, next) => {
    // password min 8 chars
    console.log(req.body)
    if (!req.body.password || req.body.password.length < 8) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 8 chars'
      })
    }
    next()
  },
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(
        token,
        'SECRETKEY'
      );
      req.tokenData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: 'Please Login'
      });
    }
  }
}