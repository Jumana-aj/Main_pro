// Import Firebase SDKs for version 9 (modular syntax)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
// Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBPsH6vEnMZL0oyh9xV01ctvnR_o6rihQg",
authDomain: "cinecloud-auth.firebaseapp.com",
projectId: "cinecloud-auth",
storageBucket: "cinecloud-auth.appspot.com",
messagingSenderId: "477162218047",
appId: "1:477162218047:web:79efce9cf1576abd668e8a"
};
// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Load JSON and Upload
async function loadJsonData() {
  try {
    const response = await fetch('./data.json');
    const data = await response.json();
    await uploadToFirestore(data);
  } catch (error) {
    console.error('Error loading JSON:', error);
  }
 

  
}
async function uploadToFirestore(data) {
  const collectionRef = collection(db, 'moviescollection');  // Replace 'placeholder' with your collection name
  for (const item of data) {
    try {
      await addDoc(collectionRef, item);
      console.log('Document added:', item);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }
}
//loadJsonData();

