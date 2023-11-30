const admin = require('firebase-admin');
const serviceAccount = require('./firebasekey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'masterpiece-e1c5f.appspot.com',
});

const storage = admin.storage();

module.exports = { admin, storage };