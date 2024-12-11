// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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

const movieDetails = JSON.parse(localStorage.getItem("movie-details"));
console.log(movieDetails.title);




// Fetch and display movie details
async function fetchMovieDetails() {

            document.getElementById("movie-poster").src = movieDetails.movieimg;
            document.getElementById("movie-title").textContent = movieDetails.title;
            document.getElementById("movie-duration").textContent = movieDetails.duration;
            document.getElementById("movie-release-date").textContent = movieDetails.release_date;
            document.getElementById("movie-genre").textContent = movieDetails.genres;
            document.getElementById("movie-language").textContent = movieDetails.language;
            document.getElementById("movie-plot").textContent = movieDetails.plot_summary;

}

// Load movie details on page load
fetchMovieDetails();
