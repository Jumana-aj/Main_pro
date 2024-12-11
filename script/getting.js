// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Your web app's Firebase configuration
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

// Fetch and display movie list from Firestore
async function fetchAndDisplayData() {
  try {

    const querySnapshot = await getDocs(collection(db, "moviescollection"));
    console.log("Fetched documents:", querySnapshot.docs.length); // Log how many documents were fetched
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Document data:", data); // Log document data to inspect it

      const div = document.createElement("div");
      div.className = "poster-item";
      const img=document.createElement("img");
      img.src=data.movieimg;
      img.addEventListener("click",()=>{
        localStorage.setItem("movie-details", JSON.stringify(data));
        window.location.href="./showmovies.html"
      })
      div.append(img);

    
      ;
      
     
      if (data.category === "Trending") {
        document.querySelector(".scroll-trending").appendChild(div);
      } else if (data.category === "Classics") {
        document.querySelector(".scroll-classics").appendChild(div);
      } else if (data.category === "Top-7") {
        document.querySelector(".scroll-top-7-rated-movies").appendChild(div);
      } else if (data.category === "90s Movies") {
        document.querySelector(".scroll-90s-movies").appendChild(div);
      } else if (data.category === "Feel-Good Movies") {
        document.querySelector(".scroll-feel-good-movies").appendChild(div);
      } else if (data.category === "Horror Movies") {
        document.querySelector(".scroll-horror-movies").appendChild(div);
      }

     
    });
  } catch (error) {
    console.error("Error fetching data from Firestore:", error.message);
  }

}

fetchAndDisplayData();
