const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");
const fs = require("fs");
const initContent = require("./lib/initContent.js");
const parseComment = require("./lib/parseComment");

async function run() {
  try {
    const { GITHUB_REPOSITORY } = process.env;
    core.debug(GITHUB_REPOSITORY);
    const [projectOwner, projectName] = GITHUB_REPOSITORY.split("/");
    const { payload, eventName } = github.context;
    const payloadData = eventName === 'issue_comment' ? payload.comment : payload;

    const {
      body: commentBody,
      user: { login: commentUsername },
      html_url: commentUrl
    } = payloadData;

    if (commentBody.indexOf('@all-contributors-action') === -1) {
      process.exit(0)
    }

    const { action, who, contributions } = parseComment(commentBody);

    if (!action) {
      core.setFailed("action only support add");
    }

    if (!fs.existsSync(".all-contributorsrc")) {
      await initContent({
        projectName,
        projectOwner
      });
    }

    const contributors = JSON.parse(fs.readFileSync('.all-contributorsrc', 'utf-8')).contributors
    const isExist = Array.isArray(contributors) && contributors.some(contributor => contributor.login === who)
    const actionType = isExist ? 'update' : 'add'

    await exec.exec(
      `npx all-contributors-cli add ${who} ${contributions.join(",")}`
    );
    await exec.exec(`npx all-contributors-cli generate`);

    // set env
    core.exportVariable("branch", `${actionType}-${who}`);
    core.exportVariable("title", `docs: ${actionType} ${who} as a contributor`);
    core.exportVariable(
      "body",
      `${actionType}s ${who} as a contributor for ${contributions.join(
        ","
      )}. \n This was requested by ${commentUsername} in [this comment](${commentUrl})`
    );
    core.exportVariable("commitMessage", `docs: ${actionType} ${who} as a contributor`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
