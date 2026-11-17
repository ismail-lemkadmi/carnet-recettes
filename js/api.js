
const api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 5000
});

function getRecipes() {
    return api.get("/recipes?limit=12");
}

export { api, getRecipes };
