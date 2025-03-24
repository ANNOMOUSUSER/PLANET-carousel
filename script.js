// Celestial Objects Array
const celestialObjects = [
    { name: "Sun", description: "The blazing heart of our solar system.", image: "sun.png" },
    { name: "Mercury", description: "The smallest and closest planet to the Sun.", image: "mercury.png" },
    { name: "Venus", description: "Earth's twin planet with a toxic atmosphere.", image: "venus.png" },
    { name: "Earth", description: "Our home planet, teeming with life.", image: "earth.png" },
    { name: "Mars", description: "The red planet with evidence of ancient rivers.", image: "mars.png" },
    { name: "Jupiter", description: "The gas giant with massive storms.", image: "jupiter.png" },
    { name: "Saturn", description: "The planet with awe-inspiring rings.", image: "saturn.png" },
    { name: "Uranus", description: "The tilted ice giant with a pale blue haze.", image: "uranus.png" },
    { name: "Neptune", description: "The farthest planet with supersonic winds.", image: "neptune.png" }
];

// DOM Elements
const blocks = document.querySelectorAll(".block");
const descriptionTitle = document.getElementById("description-title");
const descriptionText = document.getElementById("description-text");
let blockOrder = Array.from(blocks.keys());

// Initialize Images - FIXED INDEX MAPPING
function initializeImages() {
    blocks.forEach((block, index) => {
        // Direct index mapping (no modulo)
        const object = celestialObjects[index];
        block.innerHTML = "";
        const img = document.createElement("img");
        img.src = `images/${object.image}`;
        img.alt = object.name;

        img.onerror = () => {
            console.error(`Failed to load image: images/${object.image}`);
            img.style.display = "none";
        };

        block.appendChild(img);
    });
}

// Update Description - FIXED INDEX REFERENCE
function updateDescription(centerIndex) {  // Changed parameter name
    const object = celestialObjects[centerIndex];
    descriptionTitle.textContent = object.name;
    descriptionText.textContent = object.description;
}

// Update Positions - FIXED CENTER INDEX
function updatePositions() {
    blocks.forEach((block, index) => {
        const position = blockOrder.indexOf(index);

        block.className = "block";
        if (position === 0) {
            block.classList.add("left");
        } else if (position === 1) {
            block.classList.add("center");
            // Get actual center object index from blockOrder
            updateDescription(blockOrder[1]);  // Changed to use blockOrder
        } else if (position === 2) {
            block.classList.add("right");
        } else {
            block.classList.add("hidden");
        }
    });
}

// Rest of the code remains the same
function rotate(direction) {
    if (direction === "right") {
        blockOrder.unshift(blockOrder.pop());
    } else if (direction === "left") {
        blockOrder.push(blockOrder.shift());
    }
    updatePositions();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") rotate("left");
    if (e.key === "ArrowRight") rotate("right");
});
window.addEventListener("resize", updatePositions);

// Initialize
initializeImages();
updatePositions();