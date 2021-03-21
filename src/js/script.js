/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');

  const select = {
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      filters: '.filters',
    },
    book: {
      image: '.book__image',
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
      this.filterBooks();
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
      //const thisBooksList = this;

      const favoriteBooks = this.favoriteBooks;

      this.bookContainer.addEventListener('dblclick', function (event) {
        event.preventDefault();

        //const clickedElement = event.target;
        const clickedElement = event.target.offsetParent;
        //console.log(clickedElement);
        //console.log(select.book.image.substring(1));

        if (clickedElement.classList.contains(select.book.image.substring(1))) {
          clickedElement.classList.toggle('favorite');
          let imageID = clickedElement.getAttribute('data-id');
          //console.log(clickedElement);

          //Pytanie 1: dlaczego this.favoriteBooks w tym miejscu zwraca undefined jeżeli najpierw nie przypiszemy do const?
          if (!favoriteBooks.includes(imageID)) favoriteBooks.push(imageID);
          else if (favoriteBooks.includes(imageID))
            favoriteBooks.splice(favoriteBooks.indexOf(imageID, 1));
          console.log(favoriteBooks);
        }
      });

    }

    filterBooks() {
      this.filters.push('a');
      console.log(this.filters);
    }
  }

  const app = {
    init: function () {
      new BooksList();
    },
  };

  app.init();
}
