
function validateRecipe(recipe) {

    let errors = {};

    if (recipe.name.length < 3 || recipe.name.length > 60) {
        errors.name = "Le nom doit contenir entre 3 et 60 caractères";
    }

    if (recipe.cuisine === "") {
        errors.cuisine = "Veuillez entrer une cuisine";
    }

    if (
        recipe.difficulty !== "Easy" &&
        recipe.difficulty !== "Medium" &&
        recipe.difficulty !== "Hard"
    ) {
        errors.difficulty = "Veuillez choisir une difficulté";
    }

    if (
        !Number.isInteger(recipe.prepTimeMinutes) ||
        recipe.prepTimeMinutes < 1 ||
        recipe.prepTimeMinutes > 300
    ) {
        errors.time = "Le temps doit être entre 1 et 300 minutes";
    }

    return errors;
}

export { validateRecipe };
