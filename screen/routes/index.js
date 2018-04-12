var express = require('express');
var router = express.Router();
const checkScreen = require('../check-screen');

/* GET home page. */
router.post('/', async(req, res, next) => {
  console.log(req.body.answer);
  const { answer } = req.body;
  const accepted = await checkScreen(answer);
  console.log(accepted);
  res.send(JSON.stringify(accepted));
});

module.exports = router;
