#!/usr/bin/env bash

# npm publish with goodies
# inspired by https://gist.github.com/stevemao/280ef22ee861323993a0
#
# release with optional argument `patch`/`minor`/`major`/`canary`/`<version>`
# defaults to conventional-recommended-bump

function main {
  processCommandLineArgs "$@"
  release "$@"
}

function processCommandLineArgs {
  for arg in "$@"
  do
    case $arg in
      canary)
        canary
        exit 0
        ;;
      --help|help)
        echo "Commands:"
        echo "  $0            Publish a release from conventional commits."
        echo "  $0 canary     Publish a canary."
        echo "  $0 patch      Publish a patch release."
        echo "  $0 minor      Publish a minor release."
        echo "  $0 major      Publish a major release."
        echo "  $0 <version>  Publish a release with a specific version."
        exit 0
        ;;
      *)
        ;;
    esac
  done
}

function release {
  BUMP=$(npx -p conventional-changelog-angular -p conventional-recommended-bump -c 'conventional-recommended-bump -p angular')
  VERSION=$(npm --no-git-tag-version version ${1:-$BUMP})
  npx conventional-changelog-cli -p angular -i CHANGELOG.md -s
  git add CHANGELOG.md
  git commit -m "docs(CHANGELOG): $VERSION"
  npm --force --allow-same-version version $VERSION -m "chore(release): %s"
  git push --follow-tags
  npx conventional-github-releaser -p angular
  npm publish
};

function canary {
  # get last published version from NPM without alpha / beta, remove -SHA hash

  # debug jq command at https://jqplay.org/s/Wwjv5hVUCL0
  #
  #   1. remove alpha or beta versions
  #   2 & 3. convert to { version: 'x.x.x', dist: 'canary', build: x }
  #   4. sort first by `version` then by `build` number
  #   5. put back together to a string `x.x.x-canary.x`
  #   6. pick the last item in the array
  LAST_VERSION=$(npm view $(npm pkg get name | sed 's/"//g') versions --json |
    jq -r 'if type=="string" then [.] else . end | . - map(select(contains("alpha") or contains("beta")))
      | map(capture("(?<version>\\d+\\.\\d+\\.\\d+)(-(?<dist>[a-z]+))?(\\.(?<build>\\d+))?"))
      | map(.build? |= (. // 0 | tonumber))
      | sort_by(.version, .build)
      | map(.version + "-" + (.dist // "latest") + "." + (.build|tostring))
      | last')
  PRE_VERSION=$(npx semver $LAST_VERSION -i prerelease --preid canary)
  VERSION=$PRE_VERSION-$(git rev-parse --short HEAD)
  npm --no-git-tag-version version $VERSION
  npm publish --tag canary
}

main "$@"
