const core = require('@actions/core');
const github = require('@actions/github');


// most @actions toolkit packages have async methods
async function run() {
  try { 
    const { GITHUB_TOKEN, GITHUB_REPOSITORY } = process.env;
    const octokit = new github.GitHub(GITHUB_TOKEN);
    const [owner, repo] = GITHUB_REPOSITORY.split('/');

    const { data: issuePayload } = await octokit.issues.listEvents({
      owner,
      repo,
    })

    core.debug(issuePayload);
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
