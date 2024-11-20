const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const fs = require('fs').promises;
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPsH6vEnMZL0oyh9xV01ctvnR_o6rihQg",
  authDomain: "cinecloud-auth.firebaseapp.com",
  projectId: "cinecloud-auth",
  storageBucket: "cinecloud-auth.appspot.com",
  messagingSenderId: "477162218047",
  appId: "1:477162218047:web:79efce9cf1576abd668e8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// JSON data array
async function loadJsonAndPushToFirestore() {
    try {
        const data = await fs.readFile('./data.json');
        const users = JSON.parse(data);
      const userCollection = collection(db, "moviescollection");
      for (const user of users) {
        await addDoc(userCollection, user);
        console.log(`User ${user.actorname} added successfully.`);
      }
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
    }
  }
  loadJsonAndPushToFirestore();










