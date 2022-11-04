# Quiniela WorldCup 2022 Qatar

This project is redo React version of my [Quiniela for WorldCup 2018](https://github.com/vktrgama/quiniela). (may not happen, too little time)

### Design and Architecture

React 18.0
-   Material UI 5.8.5
-   AWS Amplify Back-end services:
    -   Authentication
    -   API
    -   GraphQL
    -   DynamoDb

### Deployment

This app is deployed to the cloud [AWS Amplify services](https://aws.amazon.com/amplify/?trk=41731cf6-f5eb-4611-81ef-f2914ec706b5&sc_channel=ps&sc_campaign=acquisition&sc_medium=GC-PMM|PS-GO|Brand|All|PA|Mobile%20Services|Amplify|US|EN|Text|PMO22-13306&s_kwcid=AL!4422!3!588971138365!e!!g!!aws%20amplify&ef_id=CjwKCAjw5NqVBhAjEiwAeCa97dcJNcTvjLCvshBqW7qRQhlsYf_plqNwOE3Z2qLndwWj_nJkSY89vBoCesEQAvD_BwE:G:s&s_kwcid=AL!4422!3!588971138365!e!!g!!aws%20amplify).

AWS Amplify is a set of products and tools that enable mobile and front-end web developers to build and deploy secure, scalable full-stack applications, powered by AWS.

### Install and run

```
$ npm i
$ REACT_APP_GROUP=myfriends REACT_APP_WM=webmaster REACT_APP_YEAR=2022 npm start

```