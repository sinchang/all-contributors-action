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

    await exec.exec(
      `npx all-contributors add ${who} ${contributions.join(",")}`
    );
    await exec.exec(`npx all-contributors generate`);

    // set env
    core.exportVariable("branch", `add-${who}`);
    core.exportVariable("title", `docs: add ${who} as a contributor`);
    core.exportVariable(
      "body",
      `Adds ${who} as a contributor for ${contributions.join(
        ","
      )}. \n This was requested by ${commentUsername} in [this comment](${commentUrl})`
    );
    core.exportVariable("commitMessage", `docs: add ${who} as a contributor`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
