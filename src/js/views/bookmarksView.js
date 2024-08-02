import View from "./view.js";
import icons from "../../img/icons.svg";

class bookmarksView extends View {
  _parentElement = document.querySelector(".bookmark__list");
  _data;
  _errorMsg = "No bookmarks yet. Find a nice recipe and bookmark it :)";
  _errorIcon = "smile";

  _generateMarkup() {
    return `

    ${this._data
      .map((results) => {
        return `
        <li class="preview">
              <a href="#${results.id}" class="${
          results.id === window.location.hash.slice(1) ? "active__link" : ""
        } preview__link ">
         <div class="fig__data__div">
                <div class="preview__fig">
                  <img src=${results.imageURL} alt="Test1">
                </div>

                <div class="preview__data">
                  

                    <h1 class="preview__data__recipe__title">${
                      results.title
                    }</h1>
                    <p class="preview__data__publisher">${results.publisher}</p>
                    
                </div>
        </div>
        <div class="info preview__recipe__user__generated ${
          results.key ? "" : "hidden"
        }">
                    <svg>
                        <use href="${icons}#icon-user"></use>
                    </svg>
                </div>
              </a>
            </li>`;
      })
      .join("")}
    `;
  }
}
export default new bookmarksView();
