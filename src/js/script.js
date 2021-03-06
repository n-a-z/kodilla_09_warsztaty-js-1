/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');

  const select = {
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      books: '.books-panel .books-list',
    },
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };

  function render() {
    //console.log(document.querySelector(select.templateOf.books));
    for(book in dataSource.books){
      const bookHTML = templates.books(templates.book);
      //console.log(bookHTML);

      const bookDOM = utils.createDOMFromHTML(bookHTML);
      console.log(bookDOM);

      const bookContainer = document.querySelector(select.containerOf.books);
      console.log(bookContainer);
      bookContainer.appendChild(bookDOM);
    }
  }

  render();
}
