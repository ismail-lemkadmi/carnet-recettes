
import { getRecipes, searchRecipes, addRecipe, deleteRecipe } from "./api.js";
import { showRecipes } from "./ui.js";
import { validateRecipe } from "./validation.js";


let searchForm = document.getElementById("search-form");
let searchInput = document.getElementById("search-input");
let noResults = document.getElementById("no-results");
let showAllBtn = document.getElementById("show-all-btn");

let loading = document.getElementById("loading");
let errorMessage = document.getElementById("error-message");
let retryBtn = document.getElementById("retry-btn");
let successMessage = document.getElementById("success-message");

let addModal = document.getElementById("add-modal");
let openAddBtn = document.getElementById("open-add-btn");
let closeAddBtn = document.getElementById("close-add-btn");

let addForm = document.getElementById("add-form");
let nameInput = document.getElementById("recipe-name");
let cuisineInput = document.getElementById("recipe-cuisine");
let difficultyInput = document.getElementById("recipe-difficulty");
let timeInput = document.getElementById("recipe-time");
let addBtn = document.getElementById("add-btn");
let addMessage = document.getElementById("add-message");
let addRetryBtn = document.getElementById("add-retry-btn");

let currentRecipes = [];
let busy = false;
let lastFailedAction = null;



function startLoading() {
    busy = true;
    loading.classList.remove("hidden");
}

function stopLoading() {
    busy = false;
    loading.classList.add("hidden");
}


function getErrorMessage(error) {

    if (error.response) {

        let status = error.response.status;

        if (status === 404) {
            return "Recette introuvable (404).";
        }

        if (status >= 500) {
            return "Erreur du serveur (" + status + ").";
        }

        return "Erreur lors de la requête (" + status + ").";
    }

    if (error.code === "ECONNABORTED") {
        return "Serveur injoignable : délai dépassé.";
    }

    if (error.request) {
        return "Serveur injoignable. Vérifiez votre connexion.";
    }

    return "Une erreur inattendue est survenue.";
}


function clearError() {

    errorMessage.textContent = "";
    retryBtn.classList.add("hidden");

    addRetryBtn.classList.add("hidden");

    lastFailedAction = null;
}


function showError(error, retryAction, inPopup) {

    console.log(error);

    let message = getErrorMessage(error);

    errorMessage.textContent = message;

    lastFailedAction = retryAction;
    retryBtn.classList.remove("hidden");

    if (inPopup === true) {
        addMessage.textContent = message;
        addMessage.className = "mt-4 text-red-600";
        addRetryBtn.classList.remove("hidden");
    }
}


function retryLastAction() {

    if (busy || lastFailedAction === null) {
        return;
    }

    let action = lastFailedAction;

    clearError();

    action();
}

retryBtn.addEventListener("click", retryLastAction);
addRetryBtn.addEventListener("click", retryLastAction);

function displayRecipes(recipes) {

    currentRecipes = recipes;

    showRecipes(currentRecipes, confirmDelete);

    if (recipes.length === 0) {
        noResults.classList.remove("hidden");
    } else {
        noResults.classList.add("hidden");
    }
}

function loadRecipes() {

    if (busy) {
        return;
    }

    clearError();
    successMessage.textContent = "";

    startLoading();

    getRecipes()
        .then(function(response) {

            displayRecipes(response.data.recipes);

        })
        .catch(function(error) {

            showError(error, function() {
                loadRecipes();
            }, false);

        })
        .finally(function() {

            stopLoading();

        });
}


function runSearch(word) {

    if (busy) {
        return;
    }

    clearError();
    successMessage.textContent = "";

    startLoading();

    searchRecipes(word)
        .then(function(response) {

            displayRecipes(response.data.recipes);

        })
        .catch(function(error) {

            showError(error, function() {
                runSearch(word);
            }, false);

        })
        .finally(function() {

            stopLoading();

        });
}


searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let word = searchInput.value.trim();

    if (word === "") {
        loadRecipes();
    } else {
        runSearch(word);
    }
});


showAllBtn.addEventListener("click", function() {

    searchInput.value = "";

    loadRecipes();

});


openAddBtn.addEventListener("click", function() {

    addModal.classList.remove("hidden");
    nameInput.focus();

});


function closeModal() {

    if (busy) {
        return;
    }

    addModal.classList.add("hidden");
}

closeAddBtn.addEventListener("click", closeModal);


addModal.addEventListener("click", function(event) {

    if (event.target === addModal) {
        closeModal();
    }

});


document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeModal();
    }

});


function sendRecipe(recipe) {

    if (busy) {
        return;
    }

    clearError();
    addMessage.textContent = "";

    addBtn.disabled = true;
    addBtn.textContent = "Envoi...";

    startLoading();

    addRecipe(recipe)
        .then(function(response) {

            if (!response.data || !response.data.id) {
                throw new Error("Réponse invalide du serveur");
            }

            currentRecipes.unshift(response.data);

            displayRecipes(currentRecipes);

            addForm.reset();

            addModal.classList.add("hidden");

            successMessage.textContent =
                "Recette ajoutée avec succès !";

        })
        .catch(function(error) {

            showError(error, function() {
                sendRecipe(recipe);
            }, true);

        })
        .finally(function() {

            addBtn.disabled = false;
            addBtn.textContent = "Ajouter";

            stopLoading();

        });
}


addForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (busy) {
        return;
    }

    addMessage.textContent = "";

    let recipe = {
        name: nameInput.value.trim(),
        cuisine: cuisineInput.value.trim(),
        difficulty: difficultyInput.value,
        prepTimeMinutes: Number(timeInput.value)
    };

    let errors = validateRecipe(recipe);

    // Messages sous chaque champ
    document.getElementById("name-error").textContent =
        errors.name || "";

    document.getElementById("cuisine-error").textContent =
        errors.cuisine || "";

    document.getElementById("difficulty-error").textContent =
        errors.difficulty || "";

    document.getElementById("time-error").textContent =
        errors.time || "";

    if (
        errors.name ||
        errors.cuisine ||
        errors.difficulty ||
        errors.time
    ) {
        return;
    }

    sendRecipe(recipe);
});



function confirmDelete(id) {

    if (busy) {
        return;
    }

    let confirmation = confirm(
        "Voulez-vous vraiment supprimer cette recette ?"
    );

    if (confirmation === false) {
        return;
    }

    sendDelete(id);
}


function sendDelete(id) {

    if (busy) {
        return;
    }

    clearError();
    successMessage.textContent = "";

    startLoading();

    deleteRecipe(id)
        .then(function(response) {

            if (
                !response.data ||
                response.data.isDeleted !== true ||
                response.data.id !== id
            ) {
                throw new Error("Suppression non confirmée");
            }

            let remainingRecipes = currentRecipes.filter(function(recipe) {
                return recipe.id !== id;
            });

            displayRecipes(remainingRecipes);

            successMessage.textContent =
                "Recette supprimée avec succès !";

        })
        .catch(function(error) {

            showError(error, function() {
                sendDelete(id);
            }, false);

        })
        .finally(function() {

            stopLoading();

        });
}



loadRecipes();
