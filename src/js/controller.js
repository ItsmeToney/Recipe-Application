import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import searchResultsView from "./views/searchResultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import uploadView from "./views/uploadView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    //////////////////////////
    //search results for mobile
    const mediaChange = window.matchMedia("(max-width:450px)");
    const handleChange = function (el) {
      if (el.matches) {
        document.querySelector(".search__results").style.opacity = "0";
        document.querySelector(".search__results").style.transform =
          "translateX(-100%)";
        document.querySelector(".search__results").style.visibility = "hidden";
        document.querySelector(".search__results").style.transition =
          "all .3s ease-in";
      }
    };
    handleChange(mediaChange);
    mediaChange.addEventListener("change", handleChange);
    //////////////////////////////
    recipeView.renderSpinner();
    //loading bookmarks
    model.loadBookmarks();
    bookmarksView.render(model.state.bookmarks);
    //setting the selected recipe highlighted
    searchResultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    //Loading recipe
    await model.loadRecipe(id);
    const recipe = model.state.recipe;

    //rendering recipe
    recipeView.render(recipe);
  } catch (err) {
    console.error(err.message);
    recipeView.renderError();
  }
};

const showSearchResults = async function () {
  try {
    searchResultsView.renderSpinner();
    const query = searchView.getQuery();

    if (!query) return;
    await model.loadSearchResults(query);

    //Render search Results
    //////////////////////////
    //search results for mobile
    const mediaChange = window.matchMedia("(max-width:450px)");
    const handleChange = function (el) {
      if (el.matches) {
        document.querySelector(".search__results").style.opacity = "1";
        document.querySelector(".search__results").style.transform =
          "translateX(0%)";
        document.querySelector(".search__results").style.visibility = "visible";
        document.querySelector(".search__results").style.transition =
          "all .3s ease-in";
      }
    };
    handleChange(mediaChange);
    mediaChange.addEventListener("change", handleChange);
    //////////////////////////////
    searchResultsView.render(model.getSearchResultsPage());

    //rendering pagination buttons
    paginationView.render(model.state.searchResults);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goTo) {
  searchResultsView.render(model.getSearchResultsPage(goTo));

  //rendering pagination buttons
  paginationView.render(model.state.searchResults);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  if (model.state.recipe.bookmarked)
    model.removeBookmark(model.state.recipe.id);
  else model.addBookmark(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlUploadRecipe = async function (newRecipe) {
  try {
    // uploadView.renderSpinner();
    const data = Object.fromEntries(newRecipe);

    await model.uploadRecipe(data);

    //rendering recipe
    recipeView.render(model.state.recipe);
    //rendering bookmarks
    bookmarksView.render(model.state.bookmarks);
    //success message
    uploadView.renderMessage();

    //update id in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    //closing form
    setTimeout(() => {
      uploadView.toggleWindow();
      //call rerender form page
      uploadView.renderFormPage();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    uploadView.renderError(err.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
  searchView.addHandlerSearch(showSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerUpdateBookmark(controlBookmarks);
  uploadView.addHandlerUpload(controlUploadRecipe);
};

init();
