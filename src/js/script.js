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

  class BooksList {
    constructor() {
      const thisBooksList = this; //Pytanie 1: jak używać this jako const bez przypisywania do nowej nazwy? Czyli żeby używać wszędzie this zamiast thisNazwa. Jak nie zadeklarowałem z nazwą to zwracało mi, że tablice favoriteBooks jest undefined.

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }

    initData() {
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }

    getElements() {
      const thisBooksList = this;

      thisBooksList.favoriteBooks = []; //Pytanie 1: jak używać this jako const bez przypisywania do nowej nazwy? Czyli żeby używać wszędzie this zamiast thisNazwa. Jak nie zadeklarowałem z nazwą to zwracało mi, że tablice favoriteBooks jest undefined.

      thisBooksList.bookContainer = document.querySelector(
        select.containerOf.books
      );
    }

    render() {
      const thisBooksList = this;
      //console.log(document.querySelector(select.templateOf.books));
      for (let book of thisBooksList.data) {
        const bookHTML = templates.books(book);
        //console.log('bookHTML',bookHTML);

        const bookDOM = utils.createDOMFromHTML(bookHTML);
        //console.log('bookDOM',bookDOM);

        //console.log('bookContainer',bookContainer);
        thisBooksList.bookContainer.appendChild(bookDOM);
      }
    }

    initActions() {
      const thisBooksList = this;

      const images = document.querySelectorAll(select.book.image);
      for (let image of images) {
        //console.log(image);
        image.addEventListener('dblclick', function (event) {
          event.preventDefault();
          //console.log(image.data-id);
          image.classList.toggle('favorite');
          let imageID = image.getAttribute('data-id');

          if (!thisBooksList.favoriteBooks.includes(imageID))
            thisBooksList.favoriteBooks.push(imageID);
          else if (thisBooksList.favoriteBooks.includes(imageID))
            thisBooksList.favoriteBooks.splice(
              thisBooksList.favoriteBooks.indexOf(imageID, 1)
            );
          console.log(thisBooksList.favoriteBooks);
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
