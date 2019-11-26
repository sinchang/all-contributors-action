
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)<!-- ALL-CONTRIBUTORS-BADGE:END -->
<p align="center">
  <a href="https://github.com/sinchang/all-contributors-action"><img alt="GitHub Actions status" src="https://github.com/sinchang/all-contributors-action/workflows/test/badge.svg"></a>
</p>

# All Contributors Action

> A GitHub action to automate acknowledging contributors to your open source projects

## Usage

```
name: "all-contributors"
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs:
  add-contributors:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - uses: sinchang/all-contributors-action@v1.x
      env:
        GITHUB_REPOSITORY: ${{ secrets.GITHUB_REPOSITORY }}
    - uses: gr2m/create-or-update-pull-request-action@v1.x
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        branch: ${{ env.branch }}
        body: ${{ env.body }}
        title: ${{ env.title }}
        commit-message: ${{ env.commitMessage }} // more config can see https://github.com/gr2m/create-or-update-pull-request-action
```

## Thanks

- [@gr2m/create-or-update-pull-request-action](https://github.com/gr2m/create-or-update-pull-request-action)
- [@allcontributors](https://allcontributors.org/)

## License

MIT
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/knewzen"><img src="https://avatars2.githubusercontent.com/u/10774154?v=4" width="100px;" alt="knewzen"/><br /><sub><b>knewzen</b></sub></a><br /><a href="https://github.com/sinchang/all-contributors-action/commits?author=knewzen" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!