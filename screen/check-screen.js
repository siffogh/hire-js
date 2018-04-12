const {
  Client,
  logger,
  Variables
} = require('camunda-external-task-client-js');
const got = require("got");


const checkScreen = async(answer) => {
  //  - 'baseUrl': url to the Workflow Engine
  //  - 'logger': utility to automatically log important events
  const config = {
    baseUrl: 'http://localhost:8080/engine-rest',
    use: logger
  };

  // create a Client instance with custom configuration
  const client = new Client(config);

  // susbscribe to the topic: 'creditScoreChecker'
  return new Promise((resolve, reject) => {
    client.subscribe('screeApplication', async function ({task,taskService}) {
      const score = answer.toLowerCase() === "no" ? 100 : 0;
      const processVariables = new Variables().set("score", score);

      // complete the task
      await taskService.complete(task, processVariables);
      client.stop();
      resolve(score > 70);      
    });
  });

}

module.exports = checkScreen;