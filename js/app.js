import { getRecipes } from "./api.js";
import { showRecipes } from "./ui.js";

getRecipes()
    .then(function(response) {
        showRecipes(response.data.recipes);
    });