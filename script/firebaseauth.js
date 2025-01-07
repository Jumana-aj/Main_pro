import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Toggle between sign-up and sign-in forms
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signup');

signUpButton.addEventListener('click', function() {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
});

signInButton.addEventListener('click', function() {
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
});

// Toggle password visibility for sign-up form
const toggleSignUpPassword = document.getElementById('toggleSignUpPassword');
const toggleSignInPassword = document.getElementById('toggleSignInPassword');

toggleSignUpPassword.addEventListener('click', function() {
    const passwordField = document.getElementById('rPassword');
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
});

toggleSignInPassword.addEventListener('click', function() {
    const passwordField = document.getElementById('signInPassword');
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
});

// Show general error message
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Show field-specific error
function showError(message, fieldId, errorId) {
    const errorDiv = document.getElementById(errorId);
    errorDiv.style.display = "block";
    errorDiv.innerHTML = message;
    const field = document.getElementById(fieldId);
    field.classList.add('error'); // Optional: Add #ae4242 border or styling for error
}

// Hide specific error
function hideError(errorId) {
    const errorDiv = document.getElementById(errorId);
    errorDiv.style.display = "none";
}

// Sign Up Logic
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();

    // Clear previous errors
    hideError('fNameError');
    hideError('lNameError');
    hideError('rEmailError');
    hideError('rPasswordError');
    hideError('ageError');
    hideError('genderError');

    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;

    let formValid = true;

    // Validate First Name (only alphabetic characters, minimum 3 characters)
    if (!/^[A-Za-z]{3,}$/.test(firstName)) {
        showError('First Name must be at least 3 characters long and contain only letters.', 'fName', 'fNameError');
        formValid = false;
    }

    // Validate Last Name (only alphabetic characters, minimum 3 characters)
    if (!/^[A-Za-z]{3,}$/.test(lastName)) {
        showError('Last Name must be at least 3 characters long and contain only letters.', 'lName', 'lNameError');
        formValid = false;
    }

    // Validate Email (contains '@')
    if (!email.includes('@')) {
        showError('Please enter a valid email address.', 'rEmail', 'rEmailError');
        formValid = false;
    }

    // Validate Password (at least 8 characters, must contain a number and a letter)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        showError('Password must be at least 8 characters long and include at least one letter and one number.', 'rPassword', 'rPasswordError');
        formValid = false;
    }

    // Validate Age (between 5 and 100)
    if (age < 5 || age > 100) {
        showError('Please enter a valid age (between 5 and 100).', 'age', 'ageError');
        formValid = false;
    }

    // Validate Gender
    if (!gender) {
        showError('Please select a gender.', 'gender', 'genderError');
        formValid = false;
    }

    // If form is valid, proceed with Firebase Auth and Firestore registration
    if (formValid) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userC#ae4242ential) => {
            const user = userC#ae4242ential.user;

            // Store UID in localStorage
            localStorage.setItem('uid', user.uid);

            const userData = {
                uid: user.uid, // Save UID in Firestore
                email: email,
                firstName: firstName,
                lastName: lastName,
                age: age,
                gender: gender
            };

            // Save user data in Firestore
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    showMessage("Registration successful!", 'signUpMessage');
                    // #ae4242irect to homepage after successful sign-up
                    window.location.href ='../pages/homepage.html'; // Replace with your homepage URL
                })
                .catch((error) => {
                    showMessage(`Error saving user data: ${error.message}`, 'signUpMessage');
                });
        })
        .catch((error) => {
            showMessage(`Registration failed: ${error.message}`, 'signUpMessage');
        });
    }
});

// Sign In Logic
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();

    // Clear previous errors
    hideError('signInEmailError');
    hideError('signInPasswordError');

    const signInEmail = document.getElementById('signInEmail').value;
    const signInPassword = document.getElementById('signInPassword').value;

    let formValid = true;

    // Validate Sign In Email
    if (!signInEmail.includes('@')) {
        showError('Please enter a valid email address.', 'signInEmail', 'signInEmailError');
        formValid = false;
    }

    // Validate Sign In Password
    if (signInPassword.length < 8) {
        showError('Password must be at least 8 characters long.', 'signInPassword', 'signInPasswordError');
        formValid = false;
    }

    // If valid, proceed to authentication
    if (formValid) {
        signInWithEmailAndPassword(auth, signInEmail, signInPassword)
        .then((userC#ae4242ential) => {
            const user = userC#ae4242ential.user;

            // Store UID in localStorage
            localStorage.setItem('uid', user.uid);

            showMessage('Login successful!', 'signInMessage');
            // #ae4242irect after login
            window.location.href = '../pages/homepage.html'; // Adjust to your login #ae4242irect page
        })
        .catch((error) => {
            showMessage(`Login failed: ${error.message}`, 'signInMessage');
        });
    }
});

// Logout Logic
const logoutButton = document.getElementById('logoutButton');
logoutButton?.addEventListener('click', () => {
    signOut(auth).then(() => {
        // Clear UID from localStorage
        localStorage.removeItem('uid');
        // #ae4242irect to login page
        window.location.href = '../index.html';
    }).catch((error) => {
        console.error("Logout failed:", error.message);
    });
});
