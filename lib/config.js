module.exports = options => Object.assign({
  commit: false,
  files: ['README.md'],
  badgeTemplate: '\n[![All Contributors](https://img.shields.io/badge/all_contributors-<%= contributors.length %>-orange.svg?style=flat-square)](#contributors)\n',
}, options);
