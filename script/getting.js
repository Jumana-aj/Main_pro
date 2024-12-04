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
let count=0;
async function fetchAndDisplayData() {
  try {
    const querySnapshot = await getDocs(collection(db, "moviescollection"));
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(data);
      const div = document.createElement("div");
      div.className = "poster-item";
      div.innerHTML = `
        <img src="${data.movieimg}" alt="Movie Image">
      `;
      if (count < 7) {
        document.querySelector(".scroll-container").appendChild(div);
      } else if (count >= 7 && count < 14) {
        document.querySelector(".scroll-container1").appendChild(div);
      } else {
        document.querySelector(".scroll-container2").appendChild(div);
      }
      count++;
    });
  } catch (error) {
    console.error("Error fetching data from Firestore:", error.message);
  }
  
}
fetchAndDisplayData();


// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
// import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBPsH6vEnMZL0oyh9xV01ctvnR_o6rihQg",
//   authDomain: "cinecloud-auth.firebaseapp.com",
//   projectId: "cinecloud-auth",
//   storageBucket: "cinecloud-auth.appspot.com",
//   messagingSenderId: "477162218047",
//   appId: "1:477162218047:web:79efce9cf1576abd668e8a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Fetch and display movie list from Firestore
// let count = 0;
// async function fetchAndDisplayData() {
//   try {
//     const querySnapshot = await getDocs(collection(db, "movieCollections"));
//     console.log("Data fetched successfully");

//     // Reset containers to avoid multiple appends if the function is called multiple times
//     document.querySelector(".scroll-container").innerHTML = "";
//     document.querySelector(".scroll-container1").innerHTML = "";
//     document.querySelector(".scroll-container2").innerHTML = "";

//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       console.log("Movie data:", data); // Log each movie data

//       // Ensure movieimg field is available and valid
//       if (data.movieimg) {
//         const div = document.createElement("div");
//         div.className = "poster-item";
//         div.innerHTML = `
//           <img src="${data.movieimg}" alt="Movie Image">
//         `;

//         // Append movies based on count
//         if (count < 7) {
//           document.querySelector(".scroll-container").appendChild(div);
//         } else if (count >= 7 && count < 14) {
//           document.querySelector(".scroll-container1").appendChild(div);
//         } else {
//           document.querySelector(".scroll-container2").appendChild(div);
//         }

//         count++; // Increment the counter after each movie
//       } else {
//         console.warn("No movie image found for document:", doc.id);
//       }
//     });
//   } catch (error) {
//     console.error("Error fetching data from Firestore:", error);
//   }
// }

// // Call the function to fetch and display data
// fetchAndDisplayData();



// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
// import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBPsH6vEnMZL0oyh9xV01ctvnR_o6rihQg",
//   authDomain: "cinecloud-auth.firebaseapp.com",
//   projectId: "cinecloud-auth",
//   storageBucket: "cinecloud-auth.appspot.com",
//   messagingSenderId: "477162218047",
//   appId: "1:477162218047:web:79efce9cf1576abd668e8a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// let count = 0;
// async function fetchAndDisplayData() {
//   try {
//     console.log("Fetching data from Firestore...");

//     // Fetch documents from the "movieCollections" collection
//     const querySnapshot = await getDocs(collection(db, "movieCollections"));
//     console.log("Data fetched successfully:", querySnapshot);

//     console.log(querySnapshot.empty);

//     // Reset containers to avoid multiple appends if the function is called multiple times
//     document.querySelector(".scroll-container").innerHTML = "";
//     document.querySelector(".scroll-container1").innerHTML = "";
//     document.querySelector(".scroll-container2").innerHTML = "";

//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       console.log("Movie data:", data); // Log each movie data

//       // Ensure movieimg field is available and valid
//       if (data.movieimg) {
//         const div = document.createElement("div");
//         div.className = "poster-item";
//         div.innerHTML = `
//           <img src="${data.movieimg}" alt="Movie Image">
//         `;

//         // Append movies based on count
//         if (count < 7) {
//           document.querySelector(".scroll-container").appendChild(div);
//         } else if (count >= 7 && count < 14) {
//           document.querySelector(".scroll-container1").appendChild(div);
//         } else {
//           document.querySelector(".scroll-container2").appendChild(div);
//         }

//         count++; // Increment the counter after each movie
//       } else {
//         console.warn("No movie image found for document:", doc.id);
//       }
//     });
//   } catch (error) {
//     console.error("Error fetching data from Firestore:", error);
//   }
// }

// // Call the function to fetch and display data
// fetchAndDisplayData();
