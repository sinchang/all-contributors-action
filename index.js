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

    if (!fs.existsSync(".all-contributorsrc")) {
      initContent({
        projectName,
        projectOwner
      });
    }

    const {
      comment: {
        body: commentBody,
        user: { login: commentUsername },
        html_url: commentUrl
      }
    } = github.context.payload;
    const { action, who, contributions } = parseComment(commentBody);

    if (!action) {
      core.setFailed("action only support add");
    }

    await exec.exec(
      `npm run contributors:add ${who} ${contributions.join(",")}`
    );
    await exec.exec(`npm run contributors:generate`);

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
