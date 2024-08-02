import View from "./view.js";
import icons from "../../img/icons.svg";
import fracty from "fracty";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _data;
  _errorMsg = "No recipes found for your query. Please try again!";
  _errorIcon = "alert-triangle";
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".update__btn");
      if (!btn) return;
      const update = +btn.dataset.update;
      if (update < 1) return;
      handler(update);
    });
  }

  addHandlerUpdateBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const el = e.target.closest(".btn__bookmark");
      if (!el) return;
      handler();
    });
  }
  _generateMarkup() {
    return `
    <div class="recipe__figure">
        <img src="${this._data.imageURL}" alt="recipe image">
      </div>

        <div class="recipe__info">
            <div class="info recipe__cooking__time">
                <svg>
                    <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="cooking__time">${this._data.cookingTime}</span>
                <span class="time__text">minutes</span>
            </div>


            <div class="info servings">
                <svg>
                    <use href="${icons}#icon-users"></use>
                </svg>
                <span class="servings__people">${this._data.servings}</span>
                <span class="servings__text">servings</span>
                
          
                <div class="info servings__info__buttons">
                    <button class=" btn__small update__btn servings__minus__btn" data-update="${
                      this._data.servings - 1
                    }">
                        <svg>
                            <use href="${icons}#icon-minus-circle"></use>
                        </svg>
                    
                    </button>
                    <button class="btn__small update__btn servings__plus__btn" data-update="${
                      this._data.servings + 1
                    }">
                        <svg>
                            <use href="${icons}#icon-plus-circle"></use>
                        </svg>
                        
                    </button>
                </div>
            </div>
        
            <div class="round__btns">

                <div class="info  recipe__user__generated ${
                  this._data.key ? "" : "hidden"
                }">
                    <svg>
                        <use href="${icons}#icon-user"></use>
                    </svg>
                </div>
    
                <button class="info btn__large btn__bookmark">
                    <svg>
                        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
                    </svg>
                </button>
            </div>
           
        </div>

      
         <div class="ingredients">
            <h1 class="heading">${this._data.title}</h1>
            <ul class="ingredients__list">
            ${this._data.ingredients
              .map((ing) => {
                return `
               <li class="ingredient">
                    <svg class="check__icon">
                        <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="quantity">${
                      ing.quantity ? fracty(ing.quantity) : ""
                    }</div>
                    <div
                    <div class="ingredient_description">${ing.unit} ${
                  ing.description
                }</div>
                </li> 
              `;
              })
              .join("")}
               
               
            </ul>
         </div>

         
          <div class="recipe__direction">
            <h1 class="heading">how to cook it</h1>
            <p class="recipe__direction__text">This recipe was carefully designed and tested by <span>${
              this._data.publisher
            }</span>. Please check out directions at their website.</p>

           <button class="recipe__direction__btn">
                <a href="${this._data.sourceURL}">
                    <p>directions</p>
                </a>
                <svg>
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            
            </button>
          </div>`;
  }
}

export default new RecipeView();
