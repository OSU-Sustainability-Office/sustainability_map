# Sustainability Map
An interactive infographic map showing the sustainability features on campus! 

Note this uses Node version 14.

## Installation Steps
- Fork this repo
- Change the package.json and backend/template.yaml to reflect correct project name
- ```npm install```
- Add code to the base to develop new application

### Other Notes
- sam_express.js is included in the backend directory. This is an express wrapper for AWS SAM which makes it quicker as it wont spin up docker containers on aby invocation. Tests should still be done with the SAM local API as it simulates production closer.
- No Travis script is in this repository, this may be added later. For now, just copy one out of an existing repo and make changes as necessary.
