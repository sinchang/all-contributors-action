const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')
const fs = require('fs')
const initContent = require('./lib/initContent.js')
const parseComment = require('./lib/parseComment')
// const payload = require('./mock/payload.json')

async function run() {
  try {
    const { GITHUB_REPOSITORY = 'sinchang/repo' } = process.env;
    core.debug(GITHUB_REPOSITORY)
    const [ projectOwner, projectName ] = GITHUB_REPOSITORY.split('/')

    if (!fs.existsSync('.all-contributorsrc')) {
      initContent({
        projectName,
        projectOwner
      })
    }

    const { comment: { body: commentBody }} = github.context.payload;
    // const { comment: { body: commentBody }} = payload;

    const { action, who, contributions } = parseComment(commentBody)

    if (!action) {
      core.setFailed('action is false')
    }

    await exec.exec(`npm run contributors:add ${who} ${contributions.join(',')}`);
    await exec.exec(`npm run contributors:generate`);

    // set env
    core.exportVariable('BRANCH', `add-${who}`);
    core.debug('branch', process.env.BRANCH)
  } 
  catch (error) {
    core.setFailed(error.message)
  }
}

run()
