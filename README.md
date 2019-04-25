# OTN UI Project

UI part of OTN project.

## For developers:

Application is powered by Docker, so it's quite easy to create the local environment.
You can use npm commands to start the development environment locally if Docker is not a option for you.

### Steps:

* `git clone`
* `make install`
* `make start`

### Regular use:

* `make check-code-style` to start lint and check the code
* `make fix-code-style` to start eslint with --fix option.
* `make fix-code-style-diff` to reformat changed and cached files according to the prettier configuration.

  > **WARNING**: this cmd will update your source code according to the rules in eslint and prettier config files, so be careful with it.

* `make clean` to clean docker stuff
* `make connect-shell` to open shell in container
* `make build` to build static during deployment. It requires installed node_modules on the local machine.
  Don't forget to restart container!
* `make storybook-start` to start container with storybook server. It'll be available on http://localhost:6006
* `make storybook-build` to build static. You can find the build result in the storybook-dist folder.
* `make test` to start container with tests in watch mode. Use `CI=true` make test to start tests 1 time.
* `make coverage` to get coverage report. This will be generated to the coverage folder.

### node_modules issue:

If you have the node_modules issue when you added new dependency to the package.json,
just use `make connect-shell` cmd and execute `npm i` within container.
This will fix the module not found error.

### Git Flow:

This project uses default Git Flow approach: [Description](https://datasift.github.io/gitflow/IntroducingGitFlow.html)

1.  Create feature-branch from develop
2.  Merge feature-branch to develop
3.  Create release from develop
4.  Merge release to master
5.  Add tag to the merge commit
6.  Merge master to develop branch.

### Exchange chart
OTN wallet uses TradingView library (<https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/>) as chart provider.
This library should be licenced for specific person who would like to host his own OTN wallet.

To use TradingView chart follow next steps:
1. Get access to the library with our github credentials (use form on this page <https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/>)
1. Download copy of library into `vendor/tv`. It should have folder `static` and the file `charting_library.min.js` inside
1. copy `otn_custom.css` into static folder
1. uncomment chart component in `src/pages/Exchange/Pro/Page/TradingViewWrapper/index.js`

It's ready to use!

#### Merge Request policy:

Please, squash your commits before merge. You can use github UI or git itself as you wish.
