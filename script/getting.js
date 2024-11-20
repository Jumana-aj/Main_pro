   // Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
   import{getFirestore, collection, getDocs} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"

 
   // Your web app's Firebase configuration
   const firebaseConfig = {
     apiKey: "AIzaSyBPsH6vEnMZL0oyh9xV01ctvnR_o6rihQg",
     authDomain: "cinecloud-auth.firebaseapp.com",
     projectId: "cinecloud-auth",
     storageBucket: "cinecloud-auth.appspot.com",
     messagingSenderId: "477162218047",
     appId: "1:477162218047:web:79efce9cf1576abd668e8a"
   };
 //  Initialize Firebase
   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);
   // Fetch and display movie list from Firestore
   async function fetchAndDisplayData() {
     try {
       const querySnapshot = await getDocs(collection(db, "moviescollection"));
       querySnapshot.forEach((doc) => {
         const data = doc.data();
         const div = document.createElement("div");
         div.className = "poster-item";
         div.innerHTML = `
           <img src="${data.movieimg}" alt="Movie Image " >
         `;
         console.log("hello")
         document.querySelector(".scroll-container").appendChild(div);
       });
   } catch (error) {
       console.error("Error fetching data from Firestore:", error);
     }
   }
   fetchAndDisplayData()
   
   
   
   
   
   
   
   
   
   
   
   
   
   