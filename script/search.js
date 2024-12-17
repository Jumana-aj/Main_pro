// Mock movie database (You can replace this array with actual dynamic data from a backend)
// const movies = [
//     "Indian-2","Ayalaan","Maaveeran","Irugapatru","Vettaiyan", "Lubber Pandhu","Goat","Maharaja","jailer","mookuthi amman",
//     "raghuthatha", "aranmanai-4","singapore saloon",
//     "j-baby", "hotspot", "romeo","star","pt sir", "dear", "demonte colony-2",
//     "lover","muthu","aasai","thiruda thirudi","bombay","baashha",
//     "surya-vamsam","love birds","kushi","ghilli","boys",
//     "kandukondain kandukondain","saamy","youth","kadhal","chandramukhi","kanchana","dhilluku dhuddu","maya",
//     "pizza","demonte colony","jackson durai"
    
// ];

// Get references to the input box and suggestions box
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestionsBox");

// Event listener for input changes
searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase(); // Get input text and convert to lowercase
    suggestionsBox.innerHTML = ""; // Clear previous suggestions

    if (query) {
        // Filter movies matching the query
        const suggestions = movies.filter(movie =>
            movie.toLowerCase().includes(query)
        );

        if (suggestions.length > 0) {
            suggestionsBox.style.display = "block";
            suggestions.forEach(movie => {
                const div = document.createElement("div");
                div.className = "suggestion-item";
                div.textContent = movie;

                // Navigate to the showmovies page on click
                div.addEventListener("click", function () {
                    window.location.href = `./showmovies.html?movie=${encodeURIComponent(movie)}`;
                });
                suggestionsBox.appendChild(div);

            });
        } else {
            suggestionsBox.style.display = "none";
        }
    } else {
        suggestionsBox.style.display = "none";
    }
});

// Hide suggestions when clicking outside the input box
document.addEventListener("click", function (event) {
    if (!event.target.closest(".inputbox")) {
        suggestionsBox.style.display = "none";
    }
});
