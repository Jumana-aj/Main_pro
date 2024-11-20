   // Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
   import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
   import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"
   // TODO: Add SDKs for Firebase products that you want to use
   // https://firebase.google.com/docs/web/setup#available-libraries
 
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
   if(localStorage.getItem('loggedInUserId')){
       window.location.href="./pages/homepage.html";

   }


 function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }
 const signUp=document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;

// Validate First Name (only alphabetic characters, minimum 3 characters)
if (firstName.length < 6 ||  !/^[A-Z][a-zA-Z]*$/.test(firstName)) {
  showMessage('First Name must be at least 6 characters long and contain only letters.', 'signUpMessage');
  return;
}


  // Validate Last Name (only alphabetic characters, minimum 3 characters)
  if (lastName.length < 6 ||  !/^[A-Z][a-zA-Z]*$/.test(lastName)) {
    showMessage('Last Name must be at least 6 characters long and contain only letters.', 'signUpMessage');
    return;
  }

  // Validate Email (contains '@')
  if (!email.includes('@')) {
    showMessage('Please enter a valid email address.', 'signUpMessage');
    return;
  }

  // Validate Password (at least 8 characters, must contain a number, symbol, and uppercase letter)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    showMessage('Password must be at least 8 characters long and contain uppercase, lowercase, a number, and a special symbol.', 'signUpMessage');
    return;
  }

  // Check for weak passwords (e.g., "1234567890")
  if (/^\d{10}$/.test(password)) {
    showMessage('Password is too weak. Please choose a stronger password.', 'signUpMessage');
    return;
  }
    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: firstName,
            lastName:lastName
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage');
        }
    })
 });
// Show/Hide Password with Eye Icon
// const passwordInput = document.getElementById('rPassword');
// const eyeIcon = document.getElementById('eye-icon');

// eyeIcon.addEventListener('click', () => {
//   if (passwordInput.type === 'password') {
//     passwordInput.type = 'text';
//     eyeIcon.classList.remove('fa-eye');
//     eyeIcon.classList.add('fa-eye-slash');
//   } else {
//     passwordInput.type = 'password';
//     eyeIcon.classList.remove('fa-eye-slash');
//     eyeIcon.classList.add('fa-eye');
//   }
// });






// Validate password length
function validateForm() {
  const password = document.getElementById('password').value;
  
  // Check if password is at least 6 characters long
  if (password.length < 6) {
      document.getElementById('passwordError').style.display = 'block';
      return false;
  }

  document.getElementById('passwordError').style.display = 'none';
  return true; // Allow form submission
}


 const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='../pages/homepage.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 })
 