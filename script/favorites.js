// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection , getDocs , query ,where,getDoc,doc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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

async function displayWishlist() {
    // Retrieve the wishlist from localStorage
    const wishlist = JSON.parse(localStorage.getItem("whishlist")) || [];
    const wishlistContainer = document.querySelector(".wishlist-container");
    wishlistContainer.innerHTML = ""; // Clear the container
    if (wishlist.length === 0) {
      wishlistContainer.innerHTML = `<p class="text-center">No movies in your wishlist</p>`;
      return;
    }
    // Fetch the details of each movie in the wishlist from Firestore
    for (const movieName of wishlist) {
        console.log(movieName)
      await fetchMovieDetails(movieName, wishlistContainer); // Wait for each movie to be fetched before proceeding
    }
  }
  async function fetchMovieDetails(movieName, container) {
try {
  // Query Firestore for the movie
  const q = query(collection(db, "moviescollection"), where("title", "==", movieName));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(data)
      const movieItem = document.createElement("div");
      movieItem.className = "wishlist-item";
      movieItem.innerHTML = `
        <div class="movie-card">
          <img src="${data.movieimg}" alt="${data.title}">
          <h3>${data.title}</h3>
          <button class="btn-danger remove-btn" data-movie="${data.title}">Remove</button>
        </div>
      `;
      container.appendChild(movieItem);
      // Attach event listener to the Remove button
      const removeButton = movieItem.querySelector(".remove-btn");
      removeButton.addEventListener("click", () => removeFromWishlist(data.title));
    });
  }
} catch (error) {
  console.error("Error fetching movie details:", error);
}
}
  function removeFromWishlist(movieName) {

let wishlist = JSON.parse(localStorage.getItem("whishlist")) || [];

wishlist = wishlist.filter((movie) => movie !== movieName);

localStorage.setItem("whishlist", JSON.stringify(wishlist));

displayWishlist();
}
  displayWishlist();






