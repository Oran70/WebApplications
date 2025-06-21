// script.js – Fetch and display artworks from backend API (JSON Server)

const itemsPerPage = 5; // Number of artworks per page
let currentPage = 1; // Tracks current page for pagination
let artworks = []; // Array to store fetched artworks from backend

// Function to fetch artworks from backend and initialize page
async function fetchArtworks() {
    try {
        const response = await fetch("https://oroots-d5h6amhfbye2angj.westeurope-01.azurewebsites.net/artworks");
        const data = await response.json();
        artworks = data;
        filteredArtworks = [...artworks]; // Initially show all artworks
        displayArtworks();
    } catch (error) {
        console.error("Error fetching artworks:", error);
    }
}

let filteredArtworks = []; // This holds the current list (after search/sort)

// Function to display artworks on the page
function displayArtworks() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Clear previous content

    const totalPages = Math.max(1, Math.ceil(filteredArtworks.length / itemsPerPage));
    const start = (currentPage - 1) * itemsPerPage;
    const paginatedArtworks = filteredArtworks.slice(start, start + itemsPerPage);

    // Loop through and display each artwork
    paginatedArtworks.forEach(artwork => {
        const artworkCard = document.createElement("div");
        artworkCard.classList.add("image-card");
        artworkCard.innerHTML = `
            <img src="/${artwork.image}" alt="${artwork.name}">
            <h3>${artwork.name}</h3>
            <p><strong>Fruit Type:</strong> ${artwork.fruitType}</p>
            <p><strong>Group:</strong> ${artwork.group || 'N/A'}</p>
            <p><strong>Planted:</strong> ${new Date(artwork.plantedDate).toLocaleDateString()}</p>
            <p><strong>Artwork Date:</strong> ${new Date(artwork.artworkDate).toLocaleDateString()}</p>
        `;
        gallery.appendChild(artworkCard);
    });

    // Display current page number
    document.getElementById("pageNumber").innerText = `Page ${currentPage} of ${totalPages}`;

    // Disable/enable buttons based on page
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;
}

// Pagination event listeners

// Previous page
document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayArtworks();
    }
});

// Next page
document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < Math.ceil(filteredArtworks.length / itemsPerPage)) {
        currentPage++;
        displayArtworks();
    }
});

// Search bar functionality
// Filters artworks by name or fruit type
document.getElementById("searchBar").addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    filteredArtworks = artworks.filter(artwork =>
        artwork.name.toLowerCase().includes(searchTerm) ||
        artwork.fruitType.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    displayArtworks();
});

// Sorting dropdown functionality
// Sorts artworks based on dropdown selection

// Sort by fruitType, artworkDate, or group
let sortOrder = "asc";
document.getElementById("sortOptions").addEventListener("change", (event) => {
    const selectedValue = event.target.value;

    if (selectedValue.includes("-desc")) {
        sortOrder = "desc";
    } else {
        sortOrder = "asc";
    }

    const sortBy = selectedValue.replace("-asc", "").replace("-desc", "");

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

    currentPage = 1;
    displayArtworks();
});

// Start by fetching artworks on page load
document.addEventListener("DOMContentLoaded", fetchArtworks);
