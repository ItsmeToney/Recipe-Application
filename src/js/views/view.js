import icons from "../../img/icons.svg";
export default class View {
  _data;

  render(data) {
    this._data = data;
    // console.log(this._data);
    if (!data || (Array.isArray(data) && !data.length))
      return this.renderError();

    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;

    const markup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(markup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    // console.log(curElements);
    // console.log(newElements);
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //update changed TEXT
      if (
        !curEl.isEqualNode(newEl) &&
        newEl.firstChild?.nodeValue?.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      //update changed ATTRIBUTES
      if (!curEl.isEqualNode(newEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  renderSpinner() {
    const markup = `<div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMsg) {
    const markup = `
      <div class="error">
          <svg>
            <use href="${icons}#icon-${this._errorIcon}"></use>
          </svg>
          <p class="error__msg">${message}</p>
        </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="error">
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
          <p class="error__msg">${message}</p>
        </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
