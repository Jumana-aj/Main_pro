function editProfile() {
    const newName = prompt("Enter your new name:", "John Doe");
    const newAbout = prompt("Enter a new about text:", "Movie enthusiast. Loves binge-watching and discovering new content.");
    
    if (newName) {
      document.getElementById("profileName").textContent = newName;
    }
  
    if (newAbout) {
      document.getElementById("profileAbout").textContent = newAbout;
    }
  }
  
  // Wait for the DOM to load before running the scripts
document.addEventListener('DOMContentLoaded', function() {
  // Logout functionality
  const logoutButton = document.getElementById('logout');
  
  if (logoutButton) {
      logoutButton.addEventListener('click', function() {
          // Perform any necessary logout actions (e.g., clearing session storage or cookies)
          sessionStorage.clear(); // Optional: remove session data
          localStorage.clear();  // Optional: remove local storage data

          // Redirect the user to the login page
          window.location.href = '../index.html';  // Change 'index.html' to your actual login page URL
      });
  }
});
