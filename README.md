
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
    - uses: sinchang/all-contributors-action@master
      env:
        GITHUB_REPOSITORY: ${{ secrets.GITHUB_REPOSITORY }}
    - uses: gr2m/create-or-update-pull-request-action@v1.x
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        branch: ${{ env.branch }}
        body: ${{ env.body }}
        title: ${{ env.title }}
        commit-message: ${{ env.commitMessage }}
```

- make sure complete repository filed on package.json.
- more config about `gr2m/create-or-update-pull-request-action` can see on https://github.com/gr2m/create-or-update-pull-request-action

## Trigger

comment on the issue or pull request like below words.

```
@all-contributors-action please add @sinchang for infra
```

## Thanks

- [@gr2m/create-or-update-pull-request-action](https://github.com/gr2m/create-or-update-pull-request-action)
- [@allcontributors](https://allcontributors.org/)

## License

MIT
