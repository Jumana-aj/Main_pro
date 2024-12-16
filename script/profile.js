document.addEventListener('DOMContentLoaded', () => {
  // Get the profile name element
  const profileNameElement = document.getElementById('profileName');

  // Retrieve the name from localStorage
  const profileName = localStorage.getItem('profileName');

  // Display the name or a default text
  if (profileName) {
    profileNameElement.textContent = profileName;
  } else {
    profileNameElement.textContent = 'Guest'; // Fallback if no name is stored
  }
});
