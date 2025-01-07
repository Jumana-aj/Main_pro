import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";
import { getFirestore, getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBPsH6vEnMZL0oyh9xV01ctvnR_o6rihQg",
  authDomain: "cinecloud-auth.firebaseapp.com",
  projectId: "cinecloud-auth",
  storageBucket: "cinecloud-auth.appspot.com",
  messagingSenderId: "477162218047",
  appId: "1:477162218047:web:79efce9cf1576abd668e8a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

// DOM Elements
const profileImage = document.getElementById("profileImage");
const profileName = document.getElementById("profileName");
const profileUsername = document.getElementById("profileUsername");
const editProfileModal = document.getElementById("editProfileModal");
const closeModalButton = document.querySelector(".close");
const editProfileButton = document.getElementById("editProfileButton");
const logoutButton = document.getElementById("logoutButton");

// Modal open/close logic
editProfileButton.addEventListener("click", () => {
  editProfileModal.style.display = "block"; // Show the modal
});

closeModalButton.addEventListener("click", () => {
  editProfileModal.style.display = "none"; // Close the modal
});

// Close modal if clicked outside
window.addEventListener("click", (event) => {
  if (event.target === editProfileModal) {
    editProfileModal.style.display = "none"; // Close modal if clicked outside
  }
});

// Handle Profile Data Update
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      profileImage.src = userData.profileImg || "https://via.placeholder.com/150";
      profileName.textContent = userData.firstName || "Anonymous";
    } else {
      console.error("User data not found.");
    }

    // Edit Profile Form submission
    const editProfileForm = document.getElementById("editProfileForm");
    editProfileForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const firstName = document.getElementById("firstName").value;
      const profileImageUpload = document.getElementById("profileImageUpload").files[0];

      const updates = {};

      if (firstName) updates.firstName = firstName;

      // If profile image is updated, upload to Cloudinary and update Firestore
      if (profileImageUpload) {
        const formData = new FormData();
        formData.append("file", profileImageUpload);
        formData.append("upload_preset", "ml_default");
        formData.append("cloud_name", "dduesprmp");

        const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/dduesprmp/image/upload", {
          method: "POST",
          body: formData,
        });

        const cloudinaryData = await cloudinaryResponse.json();
        const profileImageUrl = cloudinaryData.secure_url;

        // Update profile image URL in Firestore
        updates.profileImg = profileImageUrl;
        profileImage.src = profileImageUrl; // Show updated image on the page
      }

      // Update Firestore with the new data
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, updates);

      alert("Profile updated successfully!");
      editProfileModal.style.display = "none"; // Close the modal after saving changes
    });

  } else {
    window.location.href = "../index.html"; // #ae4242irect to index page if not logged in
  }
});

// Logout
logoutButton.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "../index.html"; // #ae4242irect to index page on logout
});
