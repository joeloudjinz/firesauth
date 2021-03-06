import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

import { initializeApp, auth } from "firebase-admin";

initializeApp();
// 'onCall()' means it going to be called from the frontend
// 'data' holds the information sent with the call to this cloud function
// 'context' holds data about authentication (and more) of the user that made
// the call of this cloud function
exports.addAdminRole = functions.https.onCall((data, context) => {
  // context.auth holds the authentication object
  if (context.auth && !context.auth.token.admin) {
    return {
      error: "Only admins can add new admins, sucker"
    };
  }

  // get the user
  return auth()
    .getUserByEmail(data.email)
    .then(user => auth().setCustomUserClaims(user.uid, { admin: true }))
    .then(() => {
      return {
        message: `Owner of ${data.user} has been made admin successfully`
      };
    })
    .catch(error => {
      return {
        message: error.message
      };
    });
});
