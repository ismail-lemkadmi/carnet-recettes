# Carnet de Recettes

Application web permettant de consulter, rechercher, ajouter et supprimer des recettes de cuisine à l'aide de l'API DummyJSON.

Ce projet a été réalisé dans le cadre de ma formation en développement web à **YouCode**.

## Technologies utilisées

- HTML5
- Tailwind CSS
- JavaScript (Vanilla JS)
- Axios
- DummyJSON API
- Git et GitHub

## Fonctionnalités

### US-01 — Afficher les recettes
- Récupération de 12 recettes avec Axios.
- Affichage des recettes sous forme de cartes.
- Chaque carte contient le nom, l'image, la cuisine, la difficulté et le temps de préparation.
- Affichage du nombre de recettes.

### US-02 — Rechercher une recette
- Barre de recherche par mot-clé.
- Recherche avec l'API DummyJSON.
- Affichage des résultats sans recharger la page.
- Message « Aucune recette trouvée » si aucun résultat.
- Bouton « Voir toutes les recettes ».

### US-03 — Ajouter une recette
- Formulaire affiché dans une fenêtre Popup (Modal).
- Validation des champs :
  - Nom : entre 3 et 60 caractères.
  - Cuisine : obligatoire.
  - Difficulté : obligatoire.
  - Temps de préparation : entre 1 et 300 minutes.
- Affichage des messages d'erreur sous chaque champ invalide.
- Envoi des données avec Axios POST.
- Désactivation du bouton pendant l'envoi.
- Affichage de la nouvelle recette en première position après la réponse du serveur.
- Message de confirmation après l'ajout.

### US-04 — Supprimer une recette
- Bouton « Supprimer » sur chaque carte.
- Demande de confirmation avant la suppression.
- Envoi d'une requête DELETE avec Axios.
- Suppression de la carte après confirmation du serveur.
- Message de succès après la suppression.

### US-05 — Chargement et gestion des erreurs
- Indicateur de chargement pendant les requêtes.
- Messages d'erreur selon le problème :
  - Serveur injoignable.
  - Recette introuvable (404).
  - Erreur du serveur (500).
- Bouton « Réessayer » pour relancer une opération échouée.

## Structure du projet

- `index.html` : structure HTML de l'application.
- `css/input.css` : fichier source Tailwind CSS.
- `css/style.css` : fichier CSS généré par Tailwind.
- `js/api.js` : configuration Axios et requêtes API.
- `js/app.js` : logique principale et événements.
- `js/ui.js` : création et affichage des cartes avec le DOM.
- `js/validation.js` : validation du formulaire.
- `TESTS.md` : tests manuels de l'application.
- `README.md` : documentation du projet.

## Installation

**1. Cloner le projet**

`git clone URL_DU_REPOSITORY`

**2. Ouvrir le dossier du projet**

`cd carnet-recettes`

**3. Installer les dépendances**

`npm install`

**4. Générer le CSS avec Tailwind**

`npx @tailwindcss/cli -i ./css/input.css -o ./css/style.css --watch`

**5. Lancer l'application**

Ouvrir `index.html` avec l'extension Live Server de Visual Studio Code.

## API utilisée

L'application utilise l'API publique DummyJSON.

Documentation : https://dummyjson.com/docs/recipes

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/recipes?limit=12` | Récupérer 12 recettes |
| GET | `/recipes/search?q=...` | Rechercher une recette |
| POST | `/recipes/add` | Ajouter une recette |
| DELETE | `/recipes/{id}` | Supprimer une recette |

Toutes les requêtes utilisent une seule instance Axios avec une `baseURL` et un `timeout` de 5 secondes.

## Tests

Les tests manuels sont documentés dans le fichier `TESTS.md`.

Scénarios à vérifier :

- Chargement et affichage des recettes.
- Recherche avec et sans résultat.
- Validation des champs du formulaire.
- Ajout d'une recette valide.
- Confirmation et annulation de la suppression.
- Affichage des erreurs et utilisation du bouton Réessayer.

## Captures d'écran

Captures à ajouter après les tests :

- Page d'accueil avec les recettes.
- Résultats d'une recherche.
- Message « Aucune recette trouvée ».
- Popup d'ajout d'une recette.
- Messages de validation.
- Nouvelle recette ajoutée.
- Confirmation de suppression.
- Exemple de chargement et d'erreur.

## Limites de l'API

DummyJSON est une API de démonstration.

Les opérations POST et DELETE simulent l'ajout et la suppression, mais les modifications ne sont pas enregistrées définitivement sur le serveur.

Les changements affichés dans l'interface peuvent donc disparaître après un rechargement ou une nouvelle récupération des recettes.

## Organisation du projet

Le projet a été organisé en plusieurs User Stories pour faciliter le développement et le suivi des tâches.

- **Kanban :** lien à ajouter.
- **GitHub :** lien du repository à ajouter.
- **Démo :** lien GitHub Pages à ajouter après le déploiement.

## Auteur

Projet réalisé par **Ismail Lemkadmi**.

