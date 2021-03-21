/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ("use strict");

  const select = {
    templateOf: {
      books: "#template-book",
    },
    containerOf: {
      books: ".books-list",
      filters: ".filters",
    },
    book: {
      image: ".book__image",
    },
  };

  const templates = {
    books: Handlebars.compile(
      document.querySelector(select.templateOf.books).innerHTML
    ),
  };

  class BooksList {
    constructor() {
      //const thisBooksList = this; //Pytanie 1: jak używać this jako const bez przypisywania do nowej nazwy? Czyli żeby używać wszędzie this zamiast thisNazwa. Jak nie zadeklarowałem z nazwą to zwracało mi, że tablice favoriteBooks jest undefined.

      this.initData();
      this.getElements();
      this.render();
      this.initActions();
    }

    initData() {
      //const thisBooksList = this;
      this.data = dataSource.books;
    }

    getElements() {
      //const thisBooksList = this;
      this.filters = [];
      this.favoriteBooks = []; //Pytanie 1: Wyciągnięte poza classe, gdyż this zwracało undefined zadeklarowane jako this.favoriteBooks = [];
      //thisBooksList.favoriteBooks = []; //Pytanie 1: jak używać this jako const bez przypisywania do nowej nazwy? Czyli żeby używać wszędzie this zamiast thisNazwa. Jak nie zadeklarowałem z nazwą to zwracało mi, że tablice favoriteBooks jest undefined.

      this.bookContainer = document.querySelector(select.containerOf.books);
      this.filterContainer = document.querySelector(select.containerOf.filters);
    }

    render() {
      //const thisBooksList = this;
      //console.log(document.querySelector(select.templateOf.books));
      for (let book of this.data) {
        const bookHTML = templates.books(book);
        //console.log('bookHTML',bookHTML);

        const bookDOM = utils.createDOMFromHTML(bookHTML);
        //console.log('bookDOM',bookDOM);

        //console.log('bookContainer',bookContainer);
        this.bookContainer.appendChild(bookDOM);
      }
    }

    initActions() {
      const thisBooksList = this;

      const favoriteBooks = this.favoriteBooks;
      //const filters = this.filters;

      this.bookContainer.addEventListener("dblclick", function (event) {
        event.preventDefault();

        //const clickedElement = event.target;
        const clickedElement = event.target.offsetParent;
        //console.log(clickedElement);
        //console.log(select.book.image.substring(1));

        if (clickedElement.classList.contains(select.book.image.substring(1))) {
          clickedElement.classList.toggle("favorite");
          let imageID = clickedElement.getAttribute("data-id");
          //console.log(clickedElement);

          //Pytanie 1: dlaczego this.favoriteBooks w tym miejscu zwraca undefined jeżeli najpierw nie przypiszemy do const?
          if (!favoriteBooks.includes(imageID)) favoriteBooks.push(imageID);
          else if (favoriteBooks.includes(imageID))
            favoriteBooks.splice(favoriteBooks.indexOf(imageID, 1));
          //console.log(favoriteBooks);
        }
      });

      thisBooksList.filterContainer.addEventListener("click", function (event) {
        const clickedElement = event.target;
        if (
          clickedElement.tagName === "INPUT" &&
          clickedElement.name === "filter" &&
          clickedElement.type === "checkbox"
        ) {
          if (clickedElement.checked)
            thisBooksList.filters.push(clickedElement.value);
          if (!clickedElement.checked)
            thisBooksList.filters.splice(
              thisBooksList.filters.indexOf(clickedElement.value, 1)
            );
        }

        //console.log(filters);
        thisBooksList.filterBooks(); //Pytanie 2: Podobnie jak w pyt 1, dopuki nie przypisałem this do stałej, funkcja filterBooks była zwracana jako undefined. Czy lepiej więc zawsze na początku metody przypisywać this do const?
        //console.log(filterBooks);
      });
    }

    filterBooks() {
      const thisBooksList = this;

      for (let book of thisBooksList.data) {
        //console.log(book);
        //console.log(book.details);

        let shouldBeHidden = false;
        for (let filter of thisBooksList.filters) {
          //console.log(thisBooksList.filters);
          //console.log(book.details[filter]);
          if (!book.details[filter]) {
            shouldBeHidden = true;
            //console.log(hideBook);
            break;
          }
        }
        const hideBook = document.querySelector(
          select.book.image + '[data-id="' + book.id + '"]'
        );
        //console.log(hideBook);
        //console.log(hideBook.classList);

        if (shouldBeHidden) {
          //shouldBeHidden = true;
          hideBook.classList.add("hidden");
          //console.log(hideBook);
        } else {
          hideBook.classList.remove("hidden");
        }
      }
    }
  }

  const app = {
    init: function () {
      new BooksList();
    },
  };

  app.init();
}
