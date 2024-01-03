// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, serverTimestamp, setDoc, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'

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

const utilisateurs = collection(dataBase, 'utilisateurs');

const citiesRef = collection(dataBase, 'Villes');

getDocs(citiesRef).then((snapshot) => {
   // recuperer les donnees
})

//Ajouter un dataset dans BK sous-collection "habitants"
Promise.all([
  addDoc(collection(citiesRef, "KIN", "habitants"), {
    noms: "Patrick Bashizi",
    age: "35 ans",
    sexe: "M",
  }),
  addDoc(collection(citiesRef, "KIN", "habitants"), {
    noms: "Odette Kavira",
    age: "32 ans",
    sexe: "F",
  }),
  addDoc(collection(citiesRef, "BK", "habitants"), {
    noms: "Alain Cisirika",
    age: "27 ans",
    sexe: "M",
  }),
  addDoc(collection(citiesRef, "BK", "habitants"), {
    noms: "Josephine Romana",
    age: "22 ans",
    sexe: "F",
  }),
  addDoc(collection(citiesRef, "DEGO", "habitants"), {
    noms: "Lens Mutombo",
    age: "30 ans",
    sexe: "M",
  }),
  addDoc(collection(citiesRef, "DEGO", "habitants"), {
    noms: "Josephine Ndeze",
    age: "23 ans",
    sexe: "F",
  }),
  addDoc(collection(citiesRef, "BJ", "habitants"), {
    noms: "Jean Lionel",
    age: "28 ans",
    sexe: "M",
  }),
  addDoc(collection(citiesRef, "GTG", "habitants"), {
    noms: "Chouella Kayonga",
    age: "23 ans",
    sexe: "F",
  }),
  addDoc(collection(citiesRef, "KGL", "habitants"), {
    noms: "Cynthia React",
    age: "24 ans",
    sexe: "F",
  }),
  addDoc(collection(citiesRef, "GSG", "habitants"), {
    noms: "Esther Android",
    age: "26 ans",
    sexe: "M",
  }),
  addDoc(collection(citiesRef, "NBO", "habitants"), {
    noms: "Tabitha CrowSource",
    age: "29 ans",
    sexe: "F",
  }),
  addDoc(collection(citiesRef, "MBS", "habitants"), {
    noms: "Wayne Angular",
    age: "30 ans",
    sexe: "M",
  }),
])
  .then(() => console.log("Données 'habitants' ajoutées avec succès"))
  .catch((error) => console.log(error.message));


onSnapshot(citiesRef, (snapshot) => {
     let villes = [];
    snapshot.docs.forEach((doc) => {
        villes.push({ ...doc.data(), id: doc.id })
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
})
