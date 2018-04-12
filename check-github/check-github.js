const {
  Client,
  logger,
  Variables
} = require('camunda-external-task-client-js');
const got = require("got");

// configuration for the Client:
const hasJSProjects = async (username) => {
  try {
    const {
      body: projects
    } = await got(`https://api.github.com/users/${username}/repos`, {
      json: "true"
    });
    return projects.filter(({
      language = ""
    }) => (
      language && language.toLowerCase() === "javascript"
    )).length > 0;
  } catch (e) {
    return false;
  }
};

const checkGithub = async(username) => {
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
    client.subscribe('checkGithub', async function ({task,taskService}) {
      const has = await hasJSProjects(username);
      const processVariables = new Variables().set("hasJSProjects", has);

      // complete the task
      await taskService.complete(task, processVariables);
      client.stop();
      resolve(has);      
    });
  });

}

module.exports = checkGithub;