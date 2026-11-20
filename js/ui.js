
function showRecipes(recipes, onDelete) {

    let list = document.getElementById("recipes-list");
    let count = document.getElementById("recipes-count");

    list.textContent = "";
    count.textContent = recipes.length + " recettes";

    for (let i = 0; i < recipes.length; i++) {

        let recipe = recipes[i];

        let card = document.createElement("div");
        card.className = "bg-white p-4 rounded-lg shadow";

        let image;

        if (recipe.image) {
            image = document.createElement("img");
            image.src = recipe.image;
            image.alt = recipe.name;
            image.className = "w-full h-40 object-cover rounded";
        } else {
            image = document.createElement("div");
            image.textContent = "Photo indisponible";
            image.className = "w-full h-40 bg-gray-200 flex items-center justify-center rounded text-gray-500";
        }

        let title = document.createElement("h2");
        title.textContent = recipe.name;
        title.className = "font-bold text-lg mt-3 mb-2";

        let cuisine = document.createElement("p");
        cuisine.textContent = "Cuisine : " + recipe.cuisine;

        let difficulty = document.createElement("p");
        difficulty.textContent = "Difficulté : " + recipe.difficulty;

        let time = document.createElement("p");
        time.textContent = "Préparation : " + recipe.prepTimeMinutes + " min";

        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "Supprimer";
        deleteBtn.className = "bg-red-600 text-white px-4 py-2 rounded-lg mt-4 cursor-pointer";

        deleteBtn.addEventListener("click", function() {
            onDelete(recipe.id);
        });

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(cuisine);
        card.appendChild(difficulty);
        card.appendChild(time);
        card.appendChild(deleteBtn);

        list.appendChild(card);
    }
}

export { showRecipes };
