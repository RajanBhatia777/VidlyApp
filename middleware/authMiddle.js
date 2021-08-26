/* eslint-disable consistent-return */
const auth = async (req, res, next) => {
  const token = req.header('x-Auth-Token');
  if (token) { return next(); }
  res.status(404).send('Access denied');
};

module.exports = auth;
