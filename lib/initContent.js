const { addBadge, addContributorsList } = require('all-contributors-cli/dist/init/init-content')
const { markdown, configFile } = require('all-contributors-cli/dist/util')
const ensureFileExists = require('all-contributors-cli/dist/init/file-exist')
const getConfig = require('./config')

function injectInFile(file, fn) {
  return markdown.read(file).then(content => markdown.write(file, fn(content)))
}

function initContent(options) {
  const config = getConfig(options)
  const contributorFile = config.files[0]
  return configFile
      .writeConfig('.all-contributorsrc', config)
      .then(() => {
        ensureFileExists(contributorFile)
      })
      .then(() =>
        injectInFile(contributorFile, addContributorsList),
      )
      .then(() => {
          return injectInFile(contributorFile, addBadge)
      })
}

module.exports = initContent