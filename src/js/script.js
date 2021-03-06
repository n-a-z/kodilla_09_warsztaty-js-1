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

  function render() {
    console.log(document.querySelector(select.templateOf.books));
  }

  render();
}
