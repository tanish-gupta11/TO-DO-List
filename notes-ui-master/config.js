import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "API-KEY",
    authDomain: "AUTH-DOMAIN",
    databaseURL: "DATABASE-URL",
    projectId: "PROJECT-ID",
    storageBucket: "STORAGE-BUCKET",
    messagingSenderId: "MESSAGING-ID",
    appId: "APP-ID"
  };
firebase.initializeApp(firebaseConfig);
export default firebase.database();
