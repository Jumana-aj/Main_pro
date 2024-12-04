import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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

// Function to check if a movie already exists in Firestore
async function movieExists(title) {
  const movieCollection = collection(db, "moviescollection");
  const movieQuery = query(movieCollection, where("title", "==", title)); // Query based on title

  const querySnapshot = await getDocs(movieQuery);

  // If there are documents that match, the movie exists
  return !querySnapshot.empty;
}

// JSON data array
async function loadJsonAndPushToFirestore() {
  try {
    const response = await fetch('./data.json');
    const movies = await response.json(); // Properly parse the JSON response
    const movieCollection = collection(db, "moviescollection");

    // Loop through each movie object and add it to Firestore
    for (const movie of movies) {
      const exists = await movieExists(movie.title); // Check if movie already exists
      if (exists) {
        console.log(`Movie "${movie.title}" already exists. Skipping upload.`);
        continue; // Skip adding this movie
      }

      await addDoc(movieCollection, movie); // Adding the movie document
      console.log(`Movie "${movie.title}" added successfully.`); // Log the movie title
    }
  } catch (error) {
    console.error("Error adding data to Firestore:", error);
  }
}

// Uncomment this to run the function when needed
loadJsonAndPushToFirestore();
