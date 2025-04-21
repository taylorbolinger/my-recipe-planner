
if (document.getElementById("recipeForm")) {
    const form = document.getElementById("recipeForm");

    form.addEventListener("submit", function (e) {
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
if (document.getElementById("recipeContainer")) {
    const container = document.getElementById("recipeContainer");
    const searchInput = document.getElementById("searchInput");
    let recipes = JSON.parse(localStorage.getItem("recipes"));

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

        localStorage.setItem("recipes", JSON.stringify(recipes));
    }

    function displayRecipes(filter = "") {
        container.innerHTML = "";

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
                    <a href="view.html?id=${recipe.id}" style="text-decoration: none; color: inherit;">
                      <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                      <div class="card-body">
                        <h5 class="card-title">${recipe.title}</h5>
                        <p class="card-text">${recipe.ingredients.split(',')[0]} + more</p>
                      </div>
                    </a>
                    <div class="card-footer bg-white border-0">
                      <button class="btn btn-outline-danger w-100">❤️ Add to Favorites</button>
                    </div>
                  </div>
                `;

                container.appendChild(card);
            }
        });

        if (visibleCount === 0) {
            container.innerHTML = `
                <div class="text-center text-muted mt-4">
                    <p>No recipes found. Try a different search term.</p>
                </div>
            `;
        }
    }

    displayRecipes();

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const filter = e.target.value.trim();
            displayRecipes(filter);
        });
    }
}

// ========== VIEW/EDIT RECIPE PAGE ==========
if (document.getElementById("recipeView")) {
    const recipeView = document.getElementById("recipeView");
    const params = new URLSearchParams(window.location.search);
    const recipeId = parseInt(params.get("id"));
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    const recipe = recipes.find(r => r.id === recipeId);

    if (!recipe) {
        recipeView.innerHTML = `<p class="text-center text-muted">Recipe not found.</p>`;
    } else {
        recipeView.innerHTML = `
            <h2 class="mb-4 text-center">${recipe.title}</h2>
            <div class="mb-3 text-center">
                <img src="${recipe.image}" alt="${recipe.title}" class="img-fluid rounded shadow-sm" style="max-height: 300px;">
            </div>
            <form id="editRecipeForm" class="mb-5" style="max-width: 600px; margin: 0 auto;">
                <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input type="text" class="form-control" id="editTitle" value="${recipe.title}" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Image URL</label>
                    <input type="url" class="form-control" id="editImage" value="${recipe.image}" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Ingredients (comma-separated)</label>
                    <textarea class="form-control" id="editIngredients" rows="3" required>${recipe.ingredients}</textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Instructions</label>
                    <textarea class="form-control" id="editInstructions" rows="5" required>${recipe.instructions}</textarea>
                </div>
                <button type="submit" class="btn btn-success w-100">Save Changes</button>
            </form>
        `;

        const form = document.getElementById("editRecipeForm");
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            recipe.title = document.getElementById("editTitle").value.trim();
            recipe.image = document.getElementById("editImage").value.trim();
            recipe.ingredients = document.getElementById("editIngredients").value.trim();
            recipe.instructions = document.getElementById("editInstructions").value.trim();

            localStorage.setItem("recipes", JSON.stringify(recipes));
            alert("Recipe updated!");
            window.location.href = "index.html";
        });
    }
}


