import "@aws-amplify/ui-react/styles.css";
import {
    withAuthenticator,
  } from "@aws-amplify/ui-react";
const matches = () => {
    return <h1>These are the matches</h1>
}

export default withAuthenticator(matches);