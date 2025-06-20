const nameInput = document.getElementById("newName");
const fruitTypeInput = document.getElementById("newFruitType");
const groupInput = document.getElementById("newGroup");
const plantedDateInput = document.getElementById("newPlantedDate");
const artworkDateInput = document.getElementById("newArtworkDate");
const imageFileInput = document.getElementById("newImageFile");
const imagePreview = document.getElementById("imagePreview");
const saveButton = document.getElementById("saveArtworkBtn");

// Show image preview when a file is selected
imageFileInput.addEventListener("change", () => {
    const file = imageFileInput.files[0];
    if (file) {
        imagePreview.src = URL.createObjectURL(file);
        imagePreview.classList.remove("hidden");
    } else {
        imagePreview.classList.add("hidden");
    }
});

// Save artwork on button click
saveButton.addEventListener("click", async () => {
    const name = nameInput.value.trim();
    const fruitType = fruitTypeInput.value.trim();
    const group = groupInput.value.trim() || null;
    const plantedDate = plantedDateInput.value;
    const artworkDate = artworkDateInput.value;
    const imageFile = imageFileInput.files[0];

    // Validate input
    if (!name || !fruitType || !plantedDate || !artworkDate || !imageFile) {
        alert("Please fill in all required fields and select an image.");
        return;
    }

    // IMPORTANT: In a real application, you would upload the file to a server.
    // Here, we'll construct the path assuming the file is already in the assets/images folder.
    const imagePath = `assets/images/${imageFile.name}`;

    alert(
        `IMPORTANT: This is a simulation.\n\nTo make the new artwork appear correctly, please manually copy the image file "${imageFile.name}" into the "assets/images" folder before clicking OK.`
    );

    // Create the new artwork object
    const newArtwork = {
        name,
        fruitType,
        group,
        plantedDate,
        artworkDate,
        image: imagePath, // Use the constructed path
    };

    try {
        const response = await fetch("http://localhost:3000/artworks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newArtwork),
        });

        if (!response.ok) {
            throw new Error("Failed to save artwork.");
        }

        // Redirect to gallery after successful POST
        window.location.href = "/frontend/pages/gallery.html";

    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong while saving the artwork.");
    }
});
