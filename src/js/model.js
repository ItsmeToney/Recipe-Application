import { API_URL, KEY } from "./config.js";
import { getJSON, sendJSON } from "./helper.js";
import "regenerator-runtime/runtime.js";
export const state = {
  recipe: {},
  searchResults: {
    results: [],
    resultsPerPage: 12,
    page: 1,
  },
  bookmarks: [],
};

const createRecipeObject = function (recipe) {
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    imageURL: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceURL: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const recipe = data.data.recipe;

    state.recipe = createRecipeObject(recipe);
    if (state.bookmarks.some((bkm) => bkm.id === state.recipe.id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}&key=${KEY}`);
    const recipes = data.data.recipes;

    state.searchResults.results = recipes.map((recipe) => {
      return {
        id: recipe.id,
        imageURL: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
        ...(recipe.key && { key: recipe.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = 1) {
  state.searchResults.page = page;
  const start = (page - 1) * state.searchResults.resultsPerPage;
  const end = page * state.searchResults.resultsPerPage;
  return state.searchResults.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = () =>
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  state.recipe.bookmarked = true;
  persistBookmarks();
};

export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex((bkm) => bkm.id === id);
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;
  persistBookmarks();
};

export const loadBookmarks = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};
// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((key) => key[0].startsWith("ingredient-") && key[1] !== "")
      .map((ing) => {
        const arr = ing[1].split(",");
        if (arr.length !== 3)
          throw new Error(
            "Wrong ingredient format! Please use the correct ingredient format"
          );
        const [quantity, unit, description] = ing[1].split(",");
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      cooking_time: +newRecipe.cookingTime,
      image_url: newRecipe.imageURL,
      ingredients,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      source_url: newRecipe.sourceURL,
      title: newRecipe.title,
    };
    const data = await sendJSON(
      `${API_URL}?search=${recipe.title}&key=${KEY}`,
      recipe
    );
    state.recipe = createRecipeObject(data.data.recipe);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
