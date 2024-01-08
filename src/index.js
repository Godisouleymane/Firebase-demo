// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, serverTimestamp, setDoc, doc, onSnapshot, deleteDoc, updateDoc, query, where, orderBy, limit, collectionGroup } from 'firebase/firestore'
import { ActionCodeOperation, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, isSignInWithEmailLink, linkWithRedirect, onAuthStateChanged, sendSignInLinkToEmail, signInWithEmailAndPassword, signInWithEmailLink, signInWithRedirect, signOut } from 'firebase/auth';

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

const auth = getAuth(app);


// Se connecter avec un compte google;

const signInGoogleBtn = document.querySelector('.googleLogin');

signInGoogleBtn.addEventListener('click', () => {
  signInWithRedirect(auth, new GoogleAuthProvider())
})




// // Inscription de l'utilisateur;

// const signUpForm = document.querySelector('.signup');


// signUpForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const email = signUpForm.email.value;
//   const password = signUpForm.password.value;

//   createUserWithEmailAndPassword(auth, email, password).then((cred)=> {
//     console.log("L'utilisateur inscrit", cred.user);
//     signUpForm.reset();
//   }).catch((err)=> {
//     console.log(err.message);
//   })
// })


// // Connectez l'utilisateur 

// const loginForm = document.querySelector('.login');

// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const email = loginForm.email.value;
//   const password = loginForm.password.value;

//   signInWithEmailAndPassword(auth, email, password).then((cred)=> {
//     console.log("L'utilisateur connecté", cred.user);
//     loginForm.reset();
//   }).catch((err)=> {
//     console.log(err.message);
//   })
// })


// Authentification sans mot de passe (avec le lien email);

const passwordLessForm = document.querySelector('.passwordless')

passwordLessForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = passwordLessForm.email.value;

  const actionCodeSettings = {
    url: "http://localhost:5500/dist/index.html",
    handleCodeInApp: true,
  }

  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSign', email);
      console.log("mail envoyé a l'adresse fourni");
      passwordLessForm.reset();
    }).catch((err) => {
      console.log(err.message);
    })
});


if (isSignInWithEmailLink(auth, window.location.href)) {
  let email = window.localStorage.getItem("emailForSign");

  if (!email) {
    email = window.prompt('Veuillez, Entrez votre email pour la confirmation')
  }
  signInWithEmailLink(auth, email, window.location.href).then(() => {
    window.localStorage.removeItem('emailForSign')

    // Lier les comptes
    linkWithRedirect(auth.currentUser, new GoogleAuthProvider());
  }).catch((err) => {
    console.log(err.message);
  })
}


// Le changement d'etat de l'interface (connexion / deconnexion);

const isLoginToolbar = document.querySelector('.isLogIn-toolbar');
const isLoginHome = document.querySelector('.isLogin-home');
const isLogOut = document.querySelector('.isLogOut');
isLoginToolbar.style.display = "none";
isLoginHome.style.display = "none";
isLogOut.style.display = "none";

const userEmail = document.querySelector('.current-user')

// Souscription a l'Etat de la connexion de l'utilisateur;

onAuthStateChanged(auth, (user) => {
  if (user) {
    isLoginToolbar.style.display = "";
    isLoginHome.style.display = "";
    isLogOut.style.display = "none";
    userEmail.innerHTML = `${user.email}`
  } else {
    isLoginToolbar.style.display = "none";
    isLoginHome.style.display = "none";
    isLogOut.style.display = "";
  }
});

// De connexion de l'utilisateur 
const logoutBtn = document.querySelector('.logoutBtn');

logoutBtn.addEventListener('click', () => {
  signOut(auth)
});
