
// Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#config-web-app -->

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAe-TCAYffKjSwXV9fZ5HdS6nDUYM0rfBI",
    authDomain: "testing-a2a14.firebaseapp.com",
    databaseURL: "https://testing-a2a14.firebaseio.com",
    projectId: "testing-a2a14",
    storageBucket: "testing-a2a14.appspot.com",
    messagingSenderId: "661518369108",
    appId: "1:661518369108:web:56063a100f5e250b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const users = firebase.firestore().collection('users');

 