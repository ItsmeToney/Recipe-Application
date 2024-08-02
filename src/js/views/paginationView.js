import View from "./view.js";
import icons from "../../img/icons.svg";
class Pagination extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const numOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numOfPages);

    //page 1 and there are other pages
    if (this._data.page === 1 && numOfPages > 1)
      return `
    <button class="btn btn__inline btn__prev hidden__btn">
            <svg>
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span></span>
          </button>
    <button data-page="${
      this._data.page + 1
    }" class="btn btn__inline btn__next">
            <span>Page ${this._data.page + 1}</span>
            <svg>
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;

    //last page
    if (this._data.page === numOfPages && numOfPages > 1)
      return `
    <button data-page="${
      this._data.page - 1
    }" class="btn btn__inline btn__prev">
            <svg>
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${numOfPages - 1}</span>
          </button>
          <button  class="btn btn__inline btn__next hidden__btn">
            <span></span>
            <svg>
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;
    //other page
    if (this._data.page < numOfPages)
      return `
    <button data-page="${
      this._data.page - 1
    }" class="btn btn__inline btn__prev">
            <svg>
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>
          <button data-page="${
            this._data.page + 1
          }" class="btn btn__inline btn__next">
            <span>Page ${this._data.page + 1}</span>
            <svg>
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;

    //page 1 and there are NO other pages
    return "";
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn__inline");
      if (!btn) return;
      const goTo = +btn.dataset.page;
      handler(goTo);
    });
  }
}

export default new Pagination();
