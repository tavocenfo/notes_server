var admin = require("firebase-admin");

var serviceAccount = require("./firebase_privateKey.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

module.exports = admin;