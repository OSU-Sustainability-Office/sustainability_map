# Sustainability Map
This repo serves for an easy way to get started with a new project. If at any point there is confusion while using this, look at the Energy Dashboard repo for examples/guidance then update documentation/code in this repo to reflect those changes.

## Installation Steps
- Fork this repo
- Change the package.json and backend/template.yaml to reflect correct project name
- ```npm install```
- Add code to the base to develop new application

### Other Notes
- sam_express.js is included in the backend directory. This is an express wrapper for AWS SAM which makes it quicker as it wont spin up docker containers on aby invocation. Tests should still be done with the SAM local API as it simulates production closer.
- No Travis script is in this repository, this may be added later. For now, just copy one out of an existing repo and make changes as necessary.
