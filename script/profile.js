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
  