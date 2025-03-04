document.getElementById("saveArtworkBtn").addEventListener("click", () => {
    const name = document.getElementById("newName").value.trim();
    const fruitType = document.getElementById("newFruitType").value.trim();
    const group = document.getElementById("newGroup").value.trim() || null;
    const plantedDate = document.getElementById("newPlantedDate").value;
    const artworkDate = document.getElementById("newArtworkDate").value;
    const image = document.getElementById("newImageURL").value.trim();

    // Validate input
    if (!name || !fruitType || !plantedDate || !artworkDate || !image) {
        alert("Please fill in all required fields.");
        return;
    }

    // Retrieve existing artworks from localStorage
    let artworks = JSON.parse(localStorage.getItem("artworks")) || [];

    // Create new artwork object
    const newArtwork = {
        id: Date.now(),  // Ensures uniqueness
        name,
        fruitType,
        group,
        plantedDate,
        artworkDate,
        image
    };
    

    // Add new artwork and save back to localStorage
    artworks.push(newArtwork);
    localStorage.setItem("artworks", JSON.stringify(artworks));

    // Redirect back to gallery page
    window.location.href = "index.html";
});
