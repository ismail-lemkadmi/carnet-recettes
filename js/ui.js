
function showRecipes(recipes) {
    let list = document.getElementById("recipes-list");
    let count = document.getElementById("recipes-count");

count.textContent = recipes.length + " recettes";

    list.textContent = "";

    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];

        let card = document.createElement("div");
        card.className = "bg-white p-4 rounded-lg shadow";

        let image = document.createElement("img");
        image.src = recipe.image;
        image.alt = recipe.name;
        image.className = "w-full h-40 object-cover rounded";

        let title = document.createElement("h2");
        title.textContent = recipe.name;
        title.className = "font-bold mt-3";


let cuisine = document.createElement("p");
cuisine.textContent = "Cuisine : " + recipe.cuisine;

let difficulty = document.createElement("p");
difficulty.textContent = "Difficulté : " + recipe.difficulty;

let time = document.createElement("p");
time.textContent = "Préparation : " + recipe.prepTimeMinutes + " min";


        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(cuisine);
card.appendChild(difficulty);
card.appendChild(time);

        list.appendChild(card);
    }
}

export { showRecipes };
