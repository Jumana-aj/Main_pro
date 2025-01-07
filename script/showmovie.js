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

const moviedetails = document.getElementById("movie-details");
const playbutton = document.getElementById("play-button");
const videolink = document.getElementById("video-link");

playbutton.addEventListener("click", () => {
    moviedetails.style.display = "none";
    videolink.style.display = "block";
});

// Fetch and display movie details
async function fetchMovieDetails() {
    document.getElementById("movie-poster").src = movieDetails.movieimg;
    document.getElementById("movie-title").textContent = movieDetails.title;
    document.getElementById("movie-duration").textContent = movieDetails.duration;
    document.getElementById("movie-release-date").textContent = movieDetails.release_date;
    document.getElementById("movie-genre").textContent = movieDetails.genres;
    document.getElementById("movie-language").textContent = movieDetails.language;
    document.getElementById("movie-plot").textContent = movieDetails.plot_summary;
    document.getElementById("video-link").src = movieDetails.video_link;
}

// Wishlist and like button functionality
const likebtn = document.getElementById("likeBtn");

// Check and restore the like state on page load
const whishlist = JSON.parse(localStorage.getItem("whishlist")) || [];
if (whishlist.includes(movieDetails.title)) {
    likebtn.classList.add("active");
}

// Add or remove from the wishlist on click
likebtn.addEventListener("click", () => {
    toggleWishlist(movieDetails.title);
});

function toggleWishlist(moviename) {
    let whishlist = JSON.parse(localStorage.getItem("whishlist")) || [];

    if (whishlist.includes(moviename)) {
        // If already in wishlist, remove it
        whishlist = whishlist.filter(item => item !== moviename);
        likebtn.classList.remove("active");
        alert(`"${moviename}" has been removed from your wishlist`);
    } else {
        // Add to wishlist
        whishlist.push(moviename);
        likebtn.classList.add("active");
        alert(`"${moviename}" has been added to your wishlist`);
    }

    // Save the updated wishlist to localStorage
    localStorage.setItem("whishlist", JSON.stringify(whishlist));
}

// Load movie details on page load
fetchMovieDetails();
