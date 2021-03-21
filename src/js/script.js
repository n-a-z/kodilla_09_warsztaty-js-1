/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');

  const select = {
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      images: '.books-list .book__image',
    },
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };

  const favoriteBooks = [];

  function render() {
    //console.log(document.querySelector(select.templateOf.books));
    for(let book of dataSource.books){
      const bookHTML = templates.books(book);
      //console.log('bookHTML',bookHTML);

      const bookDOM = utils.createDOMFromHTML(bookHTML);
      //console.log('bookDOM',bookDOM);

      const bookContainer = document.querySelector(select.containerOf.books);
      //console.log('bookContainer',bookContainer);
      bookContainer.appendChild(bookDOM);
    }
  }

  function initActions() {

    const imageContainer = document.querySelectorAll(select.containerOf.images);
    //console.log(imageContainer);
    for (let image of imageContainer) {
      //imageContainer = document.querySelector(select.containerOf.image);
      //console.log(image);
      image.addEventListener('dblclick', function (event) {
        event.preventDefault();
        //console.log(image.data-id);
        image.classList.toggle('favorite');
        let imageID = image.getAttribute('data-id');
        if(!favoriteBooks.includes(imageID))favoriteBooks.push(imageID);
        else if(favoriteBooks.includes(imageID)) favoriteBooks.splice(favoriteBooks.indexOf(imageID, 1));
        //console.log(favoriteBooks);
      });
    }
    //console.log("test");


  }

  render();
  initActions();
}
