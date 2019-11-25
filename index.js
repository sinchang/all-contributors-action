const core = require('@actions/core');
const github = require('@actions/github');


// most @actions toolkit packages have async methods
async function run() {
  try { 
    const { issue } = github.context.payload;

    core.setFailed(JSON.stringify(issue));
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
