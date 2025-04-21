// This runs ONLY on add.html
if (document.getElementById("recipeForm")) {
    const form = document.getElementById("recipeForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const image = document.getElementById("image").value.trim();
        const ingredients = document.getElementById("ingredients").value.trim();
        const instructions = document.getElementById("instructions").value.trim();

        const newRecipe = {
            id: Date.now(),
            title,
            image,
            ingredients,
            instructions
        };

        const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
        storedRecipes.push(newRecipe);
        localStorage.setItem("recipes", JSON.stringify(storedRecipes));

        window.location.href = "index.html";
    });
}

// ========== INDEX PAGE FUNCTIONALITY ==========
// This runs ONLY on index.html
if (document.getElementById("recipeContainer")) {
    const container = document.getElementById("recipeContainer");
    const searchInput = document.getElementById("searchInput");
    let recipes = JSON.parse(localStorage.getItem("recipes"));

// If no recipes exist yet, load default demos
if (!recipes || recipes.length === 0) {
    recipes = [
        {
            id: Date.now(),
            title: "Spaghetti Carbonara",
            image: "images/recipe1.jpg",
            ingredients: "Spaghetti, eggs, parmesan cheese, bacon, black pepper",
            instructions: "1. Cook spaghetti. 2. Mix eggs and cheese. 3. Cook bacon. 4. Combine all with pasta and pepper."
        },
        {
            id: Date.now() + 1,
            title: "Avocado Toast",
            image: "images/recipe2.jpg",
            ingredients: "Bread, avocado, salt, lemon juice, red pepper flakes",
            instructions: "1. Toast bread. 2. Mash avocado with lemon and salt. 3. Spread on toast. 4. Sprinkle pepper flakes."
        },
        {
            id: Date.now() + 2,
            title: "Chicken Stir Fry",
            image: "images/recipe3.jpg",
            ingredients: "Chicken, bell peppers, broccoli, soy sauce, garlic, ginger",
            instructions: "1. Cook chicken. 2. Stir-fry veggies. 3. Add sauce. 4. Combine with chicken and serve."
        }
    ];

    // Save them to localStorage so they show up next time too
    localStorage.setItem("recipes", JSON.stringify(recipes));
}


    // Function to display recipes based on search filter
    function displayRecipes(filter = "") {
        container.innerHTML = ""; // Clear container

        let visibleCount = 0;

        recipes.forEach(recipe => {
            const titleMatch = recipe.title.toLowerCase().includes(filter.toLowerCase());
            const ingredientsMatch = recipe.ingredients.toLowerCase().includes(filter.toLowerCase());

            if (titleMatch || ingredientsMatch) {
                visibleCount++;

                const card = document.createElement("div");
                card.className = "col-md-4 mb-4";

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

                container.appendChild(card);
            }
        });

        // Optional: show message if no matches
        if (visibleCount === 0) {
            container.innerHTML = `
                <div class="text-center text-muted mt-4">
                    <p>No recipes found. Try a different search term.</p>
                </div>
            `;
        }
    }

    // Initial load
    displayRecipes();

    // Search input listener
    searchInput.addEventListener("input", (e) => {
        const filter = e.target.value.trim();
        displayRecipes(filter);
    });
}
