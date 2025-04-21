// Check if we're on the add.html page
if (document.getElementById("recipeForm")) {
    // Grab the form
    const form = document.getElementById("recipeForm");

    // Listen for form submission
    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Stop page from reloading

        // Grab form values
        const title = document.getElementById("title").value.trim();
        const image = document.getElementById("image").value.trim();
        const ingredients = document.getElementById("ingredients").value.trim();
        const instructions = document.getElementById("instructions").value.trim();

        // Build recipe object
        const newRecipe = {
            id: Date.now(), // unique ID
            title,
            image,
            ingredients,
            instructions
        };

        // Get existing recipes from localStorage or use an empty array
        const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

        // Add new recipe
        storedRecipes.push(newRecipe);

        // Save updated list to localStorage
        localStorage.setItem("recipes", JSON.stringify(storedRecipes));

        // Redirect back to homepage
        window.location.href = "index.html";
    });
}
