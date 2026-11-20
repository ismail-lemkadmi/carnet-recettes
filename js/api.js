
const api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 5000
});

function getRecipes() {
    return api.get("/recipes", {
        params: { limit: 12 }
    });
}

function searchRecipes(word) {
    return api.get("/recipes/search", {
        params: { q: word }
    });
}

function addRecipe(recipe) {
    return api.post("/recipes/add", recipe);
}

function deleteRecipe(id) {
    return api.delete("/recipes/" + id);
}

export { getRecipes, searchRecipes, addRecipe, deleteRecipe };
