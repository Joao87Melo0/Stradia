
const firebaseConfig = {
    apiKey: "AIzaSyBvu0mtO55x6nmZUNx-ZkHADLXm9kPMptc",
    authDomain: "stradia-dc4ec.firebaseapp.com",
    projectId: "stradia-dc4ec",
    storageBucket: "stradia-dc4ec.firebasestorage.app",
    messagingSenderId: "779122798948",
    appId: "1:779122798948:web:2b5323947f8bf371a98a71",
    measurementId: "G-B8DFHXJSCP"
};

// Inicializar Firebase
    firebase.initializeApp(firebaseConfig);

// Inicializar Firestore
const db = firebase.firestore();
