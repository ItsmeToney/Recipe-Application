import View from "./view.js";
import icons from "../../img/icons.svg";
class UploadView extends View {
  _parentElement = document.querySelector(".upload");
  _addRecipeBtn = document.querySelector(".add__recipe");
  _overlay = document.querySelector(".overlay");
  _recipeWindow = document.querySelector(".add__recipe__window");
  _closeBtn = document.querySelector(".close__btn");

  _errorIcon = "alert-triangle";
  _message = "Recipe had added successfully :)";
  constructor() {
    super();
    this.addHandlerToggleWindow();
  }

  toggleWindow() {
    this._recipeWindow.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  addHandlerToggleWindow() {
    [this._addRecipeBtn, this._closeBtn, this._overlay].forEach((btn) => {
      btn.addEventListener("click", this.toggleWindow.bind(this));
    });
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      handler(dataArr);
    });
  }

  renderFormPage() {
    const markUp = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }
  //rerender form page
  _generateMarkup() {
    return `
    <form class="upload">
        <div class="upload__column">
          <div class="upload__heading">recipe data</div>
          <label>Title</label>
          <input type="text" value="" name="title" required />
          <label>URL</label>
          <input type="text" value="" name="sourceURL" required />
          <label>Image URL</label>
          <input type="text" value="" name="imageURL" required />
          <label>Publisher</label>
          <input type="text" value="" name="publisher" required />
          <label>Prep Time</label>
          <input type="text" value="" name="cookingTime" required />
          <label>Servings</label>
          <input type="text" value="" name="servings" required />
        </div>

        <div class="upload__column">
          <div class="upload__heading">ingredients</div>
          <label>Ingredient 1</label>
          <input
            type="text"
            value=""
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            type="text"
            value=""
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredients</label>
          <input
            type="text"
            value=""
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            value=""
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            value=""
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            value=""
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
      </form>
    `;
  }
}

export default new UploadView();
