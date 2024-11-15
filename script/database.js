//    // Import the functions you need from the SDKs you need
//    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
// //    import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
//    import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"
//    // TODO: Add SDKs for Firebase products that you want to use
//    // https://firebase.google.com/docs/web/setup#available-libraries
 
//    // Your web app's Firebase configuration
//    const firebaseConfig = {
//      apiKey: "AIzaSyBPsH6vEnMZL0oyh9xV01ctvnR_o6rihQg",
//      authDomain: "cinecloud-auth.firebaseapp.com",
//      projectId: "cinecloud-auth",
//      storageBucket: "cinecloud-auth.appspot.com",
//      messagingSenderId: "477162218047",
//      appId: "1:477162218047:web:79efce9cf1576abd668e8a"
//    };
 
//    // Initialize Firebase
//    const app = initializeApp(firebaseConfig);
//    const db= getFirestore(app);

//    async function loadJsonAndPushToFirestore() {
//     try {
//       // Fetch the local JSON file (ensure it's in the correct path)
//       const response = await fetch('./data.json'); // Make sure the file path is correct
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       // Parse the JSON data
//       const data = await response.json();
//       // Reference to Firestore collection 'movielist'
//       const userCollection = collection(db, "moviescollection");
//       // Loop through each item in the JSON and add it to Firestore
//       for (const item of data) {
//         await addDoc(userCollection, item);
//         console.log(`Item ${item.id} added successfully.`);
//       }
//     } catch (error) {
//       console.error("Error adding data to Firestore:", error);
//     }
//   }
//   // Call the function to load JSON and push to Firestore
//   loadJsonAndPushToFirestore();
  
  
  // Import the functions you need from the Firebase SDKs
// Import the necessary Firebase functions
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

// Initialize Firebase
   const app = initializeApp(firebaseConfig);
   const db= getFirestore(app)

// Function to load JSON data and push it to Firestore
async function loadJsonAndPushToFirestore() {
    try {
      // Fetch JSON file - make sure the path is correct
      const response = await fetch('data.json'); // Adjust path if needed
      if (!response.ok) {
        throw new Error(`Failed to fetch JSON: ${response.statusText}`);
      }
  
      // Parse JSON data
      const data = await response.json();
  
      // Reference to Firestore collection
      const moviesCollection = collection(db, "moviescollection");
  
      // Loop through each movie item in JSON data
      for (const item of data) {
        try {
          await addDoc(moviesCollection, item);
          console.log(`Movie ID ${item.movie_id} added successfully.`);
        } catch (addError) {
          console.error(`Failed to add Movie ID ${item.movie_id}:`, addError);
        }
      }
      console.log("Data upload process completed.");
    } catch (error) {
      console.error("Error loading JSON or uploading data to Firestore:", error);
    }
  }
  
  // Call the function to load JSON data and upload to Firestore
  loadJsonAndPushToFirestore();
  