# Vigor

Vigor is built with React (React-Apollo + AWS AppSync + Material UI under the
hood) and uses GraphQL for communication to the backend database (DynamoDB).

[The Site](https://vigor-dev-staticsitebucket-1n5jgthz8o4rx.s3.us-east-2.amazonaws.com/index.html)

Try it out, choose any category and take an action to better yourself or your
community. For more info on how it works, check out the demo:

[Demo Video](https://vigor-dev-staticsitebucket-1n5jgthz8o4rx.s3.us-east-2.amazonaws.com/demo.mp4)


## Building

### Frontend

Change into `vigor` subdirectory, then use `yarn run start` to open a local
server. This will connect to the default AppSync API and you should be able to
use the app locally.

### Backend

This requires AWS CLI and AWS SAM to be installed, see `Makefile` task for
`make backend` for build rules.
