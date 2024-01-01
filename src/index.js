// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBkRg4J8MfDU6albnKxcsiuo0Jfw7oDiMw",
  authDomain: "fir-demo-cc71b.firebaseapp.com",
  projectId: "fir-demo-cc71b",
  storageBucket: "fir-demo-cc71b.appspot.com",
  messagingSenderId: "1085846996863",
  appId: "1:1085846996863:web:9842fbdebf73ef6994bc4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialisation des services firestore
const dataBase = getFirestore(app);

const utilisateurs = collection(dataBase, 'utilisateurs')

getDocs(utilisateurs).then((snapshot) => {
    let utilisateurs = [];
    snapshot.docs.forEach((doc) => {
        utilisateurs.push({ ...doc.data(), id: doc.id })
    });
    console.log(utilisateurs);
})

