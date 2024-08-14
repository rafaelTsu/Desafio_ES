const admin = require('firebase-admin');
const serviceAccount = require('../firebaseSDK.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = admin;