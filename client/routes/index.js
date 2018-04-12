var express = require('express');
var router = express.Router();
const got = require("got");


const startProcess = async () => {
  try {
    await got.post(
      "http://localhost:8080/engine-rest/process-definition/key/Hire-JS-Developer/start",
      { body: {}, json: true }
    );
  } catch (e) {
    throw e.response ? e.response.body : e;
  }
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/start', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  await startProcess();
  res.send();
});

router.post("/github", async(req, res, next) => {
  console.log(req.body.username);
  const { username } = req.body;
  const data = await got.post("http://localhost:4000/", { 
    body: { username }, 
    json: true
  });
  const accepted = JSON.parse(data.body);
  console.log('accepted: ', accepted);
  res.send(accepted);
});

router.post("/screen", async(req, res, next) => {
  console.log(req.body.answer);
  const { answer } = req.body;
  const data = await got.post("http://localhost:5000/", { 
    body: { answer }, 
    json: true
  });
  const accepted = JSON.parse(data.body);
  console.log('accepted: ', accepted);
  res.send(accepted);
});

module.exports = router;
