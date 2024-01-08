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

const utilisateurs = collection(dataBase, 'utilisateurs');

const citiesRef = collection(dataBase, 'Villes');

getDocs(citiesRef).then((snapshot) => {
   // recuperer les donnees
})

// recuperer les villes de Rd Congo
const q1 = query(citiesRef, where('pays', '==', "Rd Congo"));

// Recuperer toutes les villes sauf celles de la RDc

const q2 = query(citiesRef, where('pays', '!=', 'Rd Congo'));

// Recuperer seulement les villes de la Rd Congo et celles de Rwanda;

const q3 = query(citiesRef, where('pays', 'in', ["Rd Congo", "Rwanda"]));

// Recuperer toutes les villes sauf Bujmbura, gisenyi, Goma,

const q4 = query(citiesRef, where('ville', 'not-in', ['Bujumbura', 'Gisenyi', 'Goma']));

// recuperer les villes dont la popolation est superieur a 1M

const q5 = query(citiesRef, where('population', '>', 1000000))

// Recuperer toutes les villes ajoutees entre le 10 et le 30 juillet 2022, et arragez les selon l'ordre decroissant

const q6 = query(citiesRef, where('dateDajout', '>', new Date('Jul 10, 2022'), '<', new Date('Jul 30, 2022')), orderBy('dateDajout', 'desc'));

// Recuperer la ville avec comme commune Nyarugenge;

const q7 = query(citiesRef, where('communes', 'array-contains', 'Nyarugenge'));

// Recuperer les villes avec comme commune Nyarugenge, Bandale, Cyangugu, Ibanda

const q8 = query(citiesRef, where('communes', 'array-contains-any', ['Nyarugenge', 'Bandale', 'Cyangugu', 'Ibanda']));

// Recuperer les trois dernieres villes recememnt ajoutees

const q9 = query(citiesRef, orderBy('dateDajout', 'desc'), limit(3));

// Recuperer toutes les villes de la Rd congo dont la population est inferieur a 3M
const q10 = query(citiesRef, where('pays', '==', 'Rd Congo'), where('population', '<', 3000000));

// => Requetes de groupe des collections;
// Reference de la sous-collection(NB : ID unique pour les sous-collection)
const habitantsRef = collectionGroup(dataBase, 'habitants');
  
// recuperer tout les habitants disponible;

const q11 = query(habitantsRef);

// Recuperer les habitants feminins;

const q12 = query(habitantsRef, where('sexe', '==', 'f'));

onSnapshot(q12, (snapshot) => {
     let villes = [];
    snapshot.docs.forEach((doc) => {
        villes.push({ ...doc.data(), id: doc.id });
    });
    console.log(villes);
})

const addCityForm = document.querySelector(".ajouter");
addCityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // ajouter un document avec un id generer
    addDoc(citiesRef, {
        pays: addCityForm.pays.value,
        ville: addCityForm.ville.value,
        capital: addCityForm.capital.value === 'true' ? true : false,
        dateDajout: serverTimestamp()
    }).then(() => addCityForm.reset());

    // ajouter un doc avec un id personaliser
    // setDoc(doc(dataBase, "Villes", "NIG"), {
    //     pays: addCityForm.pays.value,
    //     ville: addCityForm.ville.value,
    //     capital: addCityForm.capital.value === 'true' ? true : false,
    //     dateDajout: serverTimestamp()
    // }).then(() => addCityForm.reset());
});

// suppression d'un document 

const deleteCityForm = document.querySelector('.suppression');

deleteCityForm.addEventListener('click', (e) => {
    e.preventDefault();

    const docRef = doc(dataBase, "Villes", deleteCityForm.id.value)

    deleteDoc(docRef).then(()=> deleteCityForm.reset())
})

// modification d'un document 

const updateCityForm = document.querySelector('.update');

updateCityForm.addEventListener('click', (e) => {
    e.preventDefault();

    const docRef = doc(dataBase, "Villes", updateCityForm.id.value)

    updateDoc(docRef, {ville: "La ville a jour"}).then(()=> updateCityForm.reset())
});


// Se connecter avec un compte google;

const signInGoogleBtn = document.querySelector('.googleLogin');

signInGoogleBtn.addEventListener('click', ()=> {
  signInWithRedirect(auth, new GoogleAuthProvider())
})

// Souscription a l'Etat de la connexion de l'utilisateur;

onAuthStateChanged(auth, (user)=> {
  console.log("Changement du status de l'utilisateur:", user);
});

// De connexion de l'utilisateur 

const logoutBtn = document.querySelector('.logout');

logoutBtn.addEventListener('click', ()=> {
  signOut(auth).then(()=> console.log("Utilisateur deconnecter")).catch((err) => console.log(err));
});


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

passwordLessForm.addEventListener('submit', (e)=> {
  e.preventDefault();

  const email = passwordLessForm.email.value;

  const actionCodeSettings = {
    url: "http://localhost:5500/dist/index.html",
    handleCodeInApp: true,
  }
  
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(()=> {
    window.localStorage.setItem('emailForSign', email);
    console.log("mail envoyé a l'adresse fourni");
    passwordLessForm.reset();
  }).catch((err)=> {
    console.log(err.message);
  })
});


if (isSignInWithEmailLink(auth, window.location.href)) {
  let email = window.localStorage.getItem("emailForSign");

  if (email == false) {
    email = window.prompt('Veuillez, Entrez votre email pour la confirmation')
  }
  signInWithEmailLink(auth, email, window.location.href).then(()=> {
    console.log("Connecter avec success");
    window.localStorage.removeItem('emailForSign')
  }).catch((err)=> {
    console.log(err.message);
  })
}

// Lier le compte avec un compte google

const linkWithGoogleBtn = document.querySelector('.linkAccount');

linkWithGoogleBtn.addEventListener('click', ()=> {
  linkWithRedirect(auth.currentUser, new GoogleAuthProvider());
});

