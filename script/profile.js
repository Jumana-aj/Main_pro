



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
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

// Listen for authentication state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();

      const profilePic = document.getElementById("profileImage");
      const profileName = document.getElementById("profileName");
      const profileAbout = document.getElementById("profileAbout");
      const fileInput = document.getElementById("fileInput");

      profilePic.src = userData.profileimg || "https://via.placeholder.com/150";
      profileName.textContent = userData.firstName || "";
      profileAbout.textContent = userData.email || "No information provided.";

      // Enable editing profile name and about section
      const editProfileButton = document.getElementById("editProfile");
      const saveProfileButton = document.getElementById("saveProfile");

      editProfileButton.addEventListener("click", () => {
        profileName.contentEditable = "true";
        profileAbout.contentEditable = "true";
        profileName.focus();
        editProfileButton.style.display = "none";
        saveProfileButton.style.display = "inline-block";
      });

      saveProfileButton.addEventListener("click", async () => {
        profileName.contentEditable = "false";
        profileAbout.contentEditable = "false";
        await updateDoc(userRef, {
          firstName: profileName.textContent,
          email: profileAbout.textContent,
        });
        editProfileButton.style.display = "inline-block";
        saveProfileButton.style.display = "none";
      });

      // Enable uploading profile image
      const uploadProfileButton = document.getElementById("uploadProfile");

      uploadProfileButton.addEventListener("click", () => {
        fileInput.click();
      });

      fileInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (file) {
          const storageRef = ref(storage, `profileImages/${user.uid}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);

          // Update Firestore with the new image URL
          await updateDoc(userRef, { profileimg: downloadURL });
          profilePic.src = downloadURL;
        }
      });

      // Logout functionality
      const logoutButton = document.getElementById("logoutButton");
      logoutButton.addEventListener("click", async () => {
        await signOut(auth);
        window.location.href = "../index.html"; // Redirect to login page
      });
    } else {
      console.error("No such user data found!");
    }
  } else {
    console.error("No user is logged in.");
    window.location.href = "../index.html"; // Redirect to login page
  }
});
