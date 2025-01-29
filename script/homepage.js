// Import Firebase SDKs for version 9 (modular syntax)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { 
  getFirestore, collection, addDoc, getDocs 
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPsH6vEnMZL0oyh9xV01ctvnR_o6rihQg",
  authDomain: "cinecloud-auth.firebaseapp.com",
  projectId: "cinecloud-auth",
  storageBucket: "cinecloud-auth.appspot.com",
  messagingSenderId: "477162218047",
  appId: "1:477162218047:web:79efce9cf1576abd668e8a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const categoryMovies = {};

// Load JSON and upload to Firestore
async function loadJsonData() {
  try {
    const response = await fetch('../utility/data.json');
    const data = await response.json();
    await uploadToFirestore(data);
  } catch (error) {
    console.error('Error loading JSON:', error);
  }
}

async function uploadToFirestore(data) {
  const collectionRef = collection(db, 'moviescollection');

  const existingDocs = await getDocs(collectionRef);
  const existingTitles = new Set();

  // Normalize existing titles for comparison
  existingDocs.forEach(doc => {
    const existingData = doc.data();
    if (existingData.title) {
      existingTitles.add(existingData.title.trim().toLowerCase());
    }
  });

  for (const item of data) {
    const normalizedTitle = item.title.trim().toLowerCase();
    if (!existingTitles.has(normalizedTitle)) {
      try {
        await addDoc(collectionRef, item);
        console.log('Document added:', item.title);
      } catch (error) {
        console.error('Error adding document:', error);
      }
    } else {
      console.log('Duplicate skipped:', item.title);
    }
  }
}

// Fetch and display movie list
async function fetchAndDisplayData() {
  try {
    const querySnapshot = await getDocs(collection(db, "moviescollection"));

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const movieID = doc.id;
      if (!data.category || !data.movieimg || !data.title) return;

      if (!categoryMovies[data.category]) {
        categoryMovies[data.category] = [];
      }

      const div = document.createElement("div");
      div.className = "poster-item";
      div.setAttribute("title", data.title.trim());

      const img = document.createElement("img");
      img.src = data.movieimg;
      img.alt = data.title.trim();

      img.addEventListener("click", () => {
        localStorage.setItem("movie-details", JSON.stringify(data));
        localStorage.setItem("movieID" ,movieID)
        window.location.href = "../pages/showmovies.html";
      });

      div.appendChild(img);
      categoryMovies[data.category].push(div);
    });

    for (let category in categoryMovies) {
      const movieContainer = document.querySelector(`.scroll-${category.toLowerCase().replace(/ /g, '-')}`);
      if (!movieContainer) continue;

      const movies = categoryMovies[category];
      movies.slice(0, 7).forEach(movie => movieContainer.appendChild(movie));

      const viewMoreButton = movieContainer.nextElementSibling;
      if (viewMoreButton && viewMoreButton.classList.contains("view-more")) {
        viewMoreButton.addEventListener("click", (event) => {
          event.preventDefault();
          showAllMovies(category, movieContainer, viewMoreButton);
        });
      }
    }
  } catch (error) {
    console.error("Error fetching data from Firestore:", error.message);
  }
}

function showAllMovies(category, movieContainer, viewMoreButton) {
  if (!categoryMovies[category] || !movieContainer) return;

  movieContainer.innerHTML = "";
  categoryMovies[category].forEach(movie => movieContainer.appendChild(movie));

  if (viewMoreButton) {
    viewMoreButton.style.visibility = "hidden";
  }
}

function filterMovies(searchTerm) {
  const suggestionsBox = document.getElementById("suggestions");
  const movieDivs = document.querySelectorAll(".poster-item[title]");
  suggestionsBox.innerHTML = "";

  movieDivs.forEach((div) => {
    const movieTitle = div.getAttribute("title");
    if (movieTitle && movieTitle.toLowerCase().includes(searchTerm.toLowerCase())) {
      const suggestionItem = document.createElement("div");
      suggestionItem.className = "suggestion-item";
      suggestionItem.textContent = movieTitle;

      suggestionItem.addEventListener("click", () => {
        const matchedMovie = Array.from(movieDivs).find(
          (d) => d.getAttribute("title").toLowerCase() === movieTitle.toLowerCase()
        );
        if (matchedMovie) {
          matchedMovie.querySelector("img").click();
        }
      });

      suggestionsBox.appendChild(suggestionItem);
    }
  });

  suggestionsBox.style.display = suggestionsBox.innerHTML ? "block" : "none";
}

// Attach search filter to input
const searchBox = document.getElementById("searchBox");
searchBox.addEventListener("input", () => {
  const searchTerm = searchBox.value;
  if (searchTerm) {
    filterMovies(searchTerm);
  } else {
    const suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.style.display = "none";
  }
});

// Initialize functions
fetchAndDisplayData();

