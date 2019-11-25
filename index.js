const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')
const fs = require('fs')
const initContent = require('./lib/initContent.js')
const parseComment = require('./lib/parseComment')
// const payload = require('./mock/payload.json')

async function run() {
  try {
    const { GITHUB_REPOSITORY } = process.env;
    core.debug(GITHUB_REPOSITORY)
    const [ projectOwner, projectName ] = GITHUB_REPOSITORY.split('/')

    if (!fs.existsSync('.all-contributorsrc')) {
      initContent({
        projectName,
        projectOwner
      })
    }

    const { comment: { body: commentBody }} = github.context.payload;

    const { action, who, contributions } = parseComment(commentBody)

    if (!action) {
      core.setFailed('action is false')
    }

    await exec.exec(`all-contributors add ${who} ${contributions.join(',')}`);
    await exec.exec(`all-contributors generate`);

    // set env
    await exec.exec(`echo "::set-env name=BRANCH::all-contributors/add-${who}"`)
    core.debug(process.env.BRANCH)
  } 
  catch (error) {
    core.setFailed(error.message)
  }
}

run()
