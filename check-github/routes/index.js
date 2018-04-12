var express = require('express');
var router = express.Router();
const checkGithub = require('../check-github');

/* GET home page. */
router.post('/', async(req, res, next) => {
  console.log(req.body.username);
  const { username } = req.body;
  const accepted = await checkGithub(username);
  console.log(accepted);
  res.send(JSON.stringify(accepted));
});

module.exports = router;
