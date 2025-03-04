// Load artworks from localStorage and combine with predefined dataset
const itemsPerPage = 5;
let currentPage = 1;
let storedArtworks = JSON.parse(localStorage.getItem("artworks")) || [];
let filteredArtworks = [...artworks, ...storedArtworks];

// Function to display artworks
function displayArtworks() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Clear previous content

    // Ensure total pages is recalculated dynamically
    const totalPages = Math.max(1, Math.ceil(filteredArtworks.length / itemsPerPage)); // Always at least 1
    const start = (currentPage - 1) * itemsPerPage;
    const paginatedArtworks = filteredArtworks.slice(start, start + itemsPerPage);

    // Generate artwork cards
    paginatedArtworks.forEach(artwork => {
        const artworkCard = document.createElement("div");
        artworkCard.classList.add("image-card");
        artworkCard.innerHTML = `<img src="${artwork.image}" alt="${artwork.name}"><h3>${artwork.name}</h3>`;
        gallery.appendChild(artworkCard);
    });

    // Update pagination display
    document.getElementById("pageNumber").innerText = `Page ${currentPage} of ${totalPages}`;


    // Ensure pagination buttons are disabled correctly
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;
}

// Ensure images load immediately when opening the page
document.addEventListener("DOMContentLoaded", displayArtworks);

// Pagination event listeners
document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayArtworks();
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < Math.ceil(filteredArtworks.length / itemsPerPage)) {
        currentPage++;
        displayArtworks();
    }
});

// Search Functionality
document.getElementById("searchBar").addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();

    filteredArtworks = artworks.filter(artwork =>
        artwork.name.toLowerCase().includes(searchTerm)
    );

    currentPage = 1; // Reset to first page
    displayArtworks();
});

// Sorting Functionality
document.getElementById("sortOptions").addEventListener("change", (event) => {
    const selectedValue = event.target.value;

    if (selectedValue.includes("-desc")) {
        sortOrder = "desc";
    } else {
        sortOrder = "asc";
    }

    const sortBy = selectedValue.replace("-asc", "").replace("-desc", ""); // Remove sorting order from value

    if (sortBy === "fruitType") {
        filteredArtworks.sort((a, b) =>
            sortOrder === "asc"
                ? a.fruitType.localeCompare(b.fruitType)
                : b.fruitType.localeCompare(a.fruitType)
        );
    } else if (sortBy === "artworkDate") {
        filteredArtworks.sort((a, b) =>
            sortOrder === "asc"
                ? new Date(a.artworkDate) - new Date(b.artworkDate)
                : new Date(b.artworkDate) - new Date(a.artworkDate)
        );
    } else if (sortBy === "group") {
        filteredArtworks.sort((a, b) =>
            sortOrder === "asc"
                ? (a.group || "").localeCompare(b.group || "")
                : (b.group || "").localeCompare(a.group || "")
        );
    }

    currentPage = 1; // Reset to first page
    displayArtworks();
});

// Initial display
displayArtworks();
