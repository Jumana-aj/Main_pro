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
