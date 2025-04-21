// This runs ONLY on add.html
if (document.getElementById("recipeForm")) {
    // Grab the form
    const form = document.getElementById("recipeForm");

    // Listen for form submission
    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent page reload

        // Get form values
        const title = document.getElementById("title").value.trim();
        const image = document.getElementById("image").value.trim();
        const ingredients = document.getElementById("ingredients").value.trim();
        const instructions = document.getElementById("instructions").value.trim();

        // Create a new recipe object
        const newRecipe = {
            id: Date.now(), // unique ID
            title,
            image,
            ingredients,
            instructions
        };

        // Get existing recipes from localStorage or start with an empty array
        const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

        // Add new recipe to the array
        storedRecipes.push(newRecipe);

        // Save the updated array back to localStorage
        localStorage.setItem("recipes", JSON.stringify(storedRecipes));

        // Redirect back to the homepage
        window.location.href = "index.html";
    });
}

// ========== INDEX PAGE FUNCTIONALITY ==========
// This runs ONLY on index.html
if (document.getElementById("recipeContainer")) {
    const container = document.getElementById("recipeContainer");

    // Load recipes from localStorage or empty array if none
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    // Loop through and create recipe cards
    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";

        // Build card HTML with recipe info
        card.innerHTML = `
            <div class="card shadow-sm h-100">
                <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.title}</h5>
                    <p class="card-text">${recipe.ingredients.split(',')[0]} + more</p>
                    <button class="btn btn-outline-danger w-100">❤️ Add to Favorites</button>
                </div>
            </div>
        `;

        // Add the card to the container
        container.appendChild(card);
    });
}

