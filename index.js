const core = require('@actions/core');
const github = require('@actions/github');


// most @actions toolkit packages have async methods
async function run() {
  try { 
    const data = github.context.payload;

    core.debug(JSON.stringify(data));
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
