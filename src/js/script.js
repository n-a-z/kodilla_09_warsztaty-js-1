/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');

  const select = {
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      books: '.books-list',
    },
    book: {
      image: '.books-list .book__image',
    },
  };

  const templates = {
    books: Handlebars.compile(
      document.querySelector(select.templateOf.books).innerHTML
    ),
  };

  const favoriteBooks = [];

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

      //thisBooksList.favoriteBooks = []; //Pytanie 1: jak używać this jako const bez przypisywania do nowej nazwy? Czyli żeby używać wszędzie this zamiast thisNazwa. Jak nie zadeklarowałem z nazwą to zwracało mi, że tablice favoriteBooks jest undefined.

      this.bookContainer = document.querySelector(
        select.containerOf.books
      );
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

      const images = document.querySelectorAll(select.book.image);
      for (let image of images) {
        //console.log(image);
        image.addEventListener('dblclick', function (event) {
          event.preventDefault();
          //console.log(image.data-id);
          image.classList.toggle('favorite');
          let imageID = image.getAttribute('data-id');

          if (!favoriteBooks.includes(imageID))
            favoriteBooks.push(imageID);
          else if (favoriteBooks.includes(imageID))
            favoriteBooks.splice(
              favoriteBooks.indexOf(imageID, 1)
            );
          console.log(favoriteBooks);
        });
      }
      //console.log("test");
    }
  }

  const app = {
    init: function () {
      new BooksList();
    },
  };

  app.init();
}
