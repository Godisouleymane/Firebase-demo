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


//Ajouter un dataset dans BK collection "Villes"
Promise.all([
  setDoc(doc(citiesRef, "KIN"), {
    pays: "Rd Congo",
    ville: "Kinshasa",
    capitale: true,
    dateDajout: new Date("Jul 1, 2022"),
    population: 15000000,
    communes: [
      "Gombe",
      "Bandale",
      "Kinshasa",
      "LingwaBK",
      "Limete",
      "Ngaliema",
    ],
  }),
  setDoc(doc(citiesRef, "BK"), {
    pays: "Rd Congo",
    ville: "Bukavu",
    capitale: false,
    dateDajout: new Date("Jul 6, 2022"),
    population: 2000000,
    communes: ["Ibanda", "Kadutu", "Bagira"],
  }),
  setDoc(doc(citiesRef, "DEGO"), {
    pays: "Rd Congo",
    ville: "Goma",
    capitale: false,
    dateDajout: new Date("Jul 9, 2022"),
    population: 1000000,
    communes: ["Goma", "Karisimbi"],
  }),
  setDoc(doc(citiesRef, "BJ"), {
    pays: "Burundi",
    ville: "Bujumbura",
    capitale: false,
    dateDajout: new Date("Jul 15, 2022"),
    population: 1500000,
    communes: ["Ntahangwa", "Mukazi", "Muha"],
  }),
  setDoc(doc(citiesRef, "GTG"), {
    pays: "Burundi",
    ville: "Gitega",
    capitale: true,
    dateDajout: new Date("Jul 17, 2022"),
    population: 130000,
    communes: ["Magara", "Nyamugari", "Rutonde"],
  }),
  setDoc(doc(citiesRef, "KGL"), {
    pays: "Rwanda",
    ville: "Kigali",
    capitale: true,
    dateDajout: new Date("Jul 28, 2022"),
    population: 1500000,
    communes: ["Gasabo", "Kicukiro", "Nyarugenge"],
  }),
  setDoc(doc(citiesRef, "GSG"), {
    pays: "Rwanda",
    ville: "Gisenyi",
    capitale: false,
    dateDajout: new Date("Jul 18, 2022"),
    population: 160000,
    communes: ["Kibuye", "Cyangugu"],
  }),
  setDoc(doc(citiesRef, "NBO"), {
    pays: "Kenya",
    ville: "Nairobi",
    capitale: true,
    dateDajout: new Date("Jul 10, 2022"),
    population: 4000000,
    communes: [
      "WestBKnds",
      "Dagoretti",
      "BKngata",
      "Kamukunji",
      "Embakasi",
      "Njiru",
      "Kakadara",
    ],
  }),
  setDoc(doc(citiesRef, "MBS"), {
    pays: "Kenya",
    ville: "Mombasa",
    capitale: false,
    dateDajout: new Date("Jul 3, 2022"),
    population: 120800,
    communes: ["Changwaniwe", "Kisauni", "Koni", "Lokini"],
  }),
])
  .then(() => console.log("Données 'Villes' ajoutées avec succès"))
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
