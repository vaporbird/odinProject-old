const addBookOuther = document.getElementById('add-book');
addBookOuther.addEventListener('click', () =>
  addBookForm.classList.toggle('collapsed')
);
const addBookForm = document.getElementById('book-submit-form');
const library = document.getElementById('book-section');
const addBookButton = document.getElementById('add-new-book');
addBookButton.addEventListener('click', (e) => {
  e.preventDefault();
  let isInvalid = false;

  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');

  if (!pages.checkValidity()) {
    pages.focus();
    pages.nextElementSibling.style.display = 'Flex';

    isInvalid = true;
  }
  if (!author.checkValidity()) {
    author.focus();
    author.nextElementSibling.style.display = 'Flex';
    isInvalid = true;
  }
  if (!title.checkValidity()) {
    title.focus();
    console.log(title.nextElementSibling);
    title.nextElementSibling.style.display = 'Flex';
    isInvalid = true;
  }

  if (isInvalid) return;

  const book = CreateNewBookFromForm();
  book.AddBookToLibrary();
  DisplayLibrary();

  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('read').checked = false;
});

const books = [];
/* const book1 = new Book('first', 'book', 321, true);
console.log(book1);
AddBookToLibrary(book1);
const book2 = new Book('first', 'book', 321, true);
console.log(book2);
AddBookToLibrary(book2);
 */
function CreateNewBookFromForm() {
  const author = document.getElementById('author').value.trim();
  const title = document.getElementById('title').value.trim();
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  return new Book(title, author, pages, read);
}

function Book(title, author, pages, read) {
  this.author = author.trim();
  this.title = title.trim();
  this.pages = +pages;
  this.read = read;
}

Book.prototype.AddBookToLibrary = function () {
  books.push(this);
  localStorage.setItem('books', JSON.stringify(books));
  DisplayLibrary();
};

Book.prototype.PrintMe = () => {
  console.log('printed');
};

/* function AddBookToLibrary (book) {
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    DisplayLibrary();
} */

function LoadLibrary() {
  library.textContent = '';
  const booksInner = JSON.parse(localStorage.getItem('books'));
  console.table(booksInner);
  books.length = 0;
  for (book of booksInner) {
    books.push(book);
  }
}

DisplayLibrary();
function DisplayLibrary() {
  LoadLibrary();
  for (book of books) {
    const element = document.createElement('div');
    element.classList += 'book';

    const text = document.createElement('span');
    text.innerText = `${book.title} by ${book.author}, ${book.pages} pages `;

    const read = document.createElement('input');
    read.type = 'checkbox';
    read.checked = book.read ? true : false;
    read.addEventListener('click', (e) => {
      MarkRead(e);
    });

    const remove = document.createElement('button');
    remove.addEventListener('click', (e) => RemoveBook(e));
    remove.innerText = 'X';
    remove.classList += 'remove-button';

    element.appendChild(text);
    element.appendChild(read);
    element.appendChild(remove);

    library.appendChild(element);
  }
}

function RemoveBook(e) {
  let confirm = false;
  myConfirmBox('Are you sure you want to delete this book?').then(
    (response) => {
      if (response === true) {
        const child = e.srcElement.parentNode;
        const parent = e.srcElement.parentNode.parentNode;
        const index = Array.prototype.indexOf.call(parent.children, child);
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        LoadLibrary();
        DisplayLibrary();
      }
    }
  );
}
/* copy from https://www.bracketcounters.com/create-custom-confirm-box-in-javascript */
let lock = false;
function myConfirmBox(message) {
  if (lock === false) {
    lock = true;
    let element = document.createElement('div');
    element.classList.add('confirm-book-delete');
    element.innerHTML = `<div class="box">
                                ${message}
                                <div>
                                    <button id="trueButton" class="btn green">Yes</button> <!-- Set Id for both buttons -->
                                    <button id="falseButton" class="btn red">No</button>
                                </div>
                            </div>`;
    document.body.appendChild(element);
    return new Promise(function (resolve, reject) {
      document
        .getElementById('trueButton')
        .addEventListener('click', function () {
          resolve(true);
          document.body.removeChild(element);
          lock = false;
        });
      document
        .getElementById('falseButton')
        .addEventListener('click', function () {
          resolve(false);
          document.body.removeChild(element);
          lock = false;
        });
    });
  }
  /*     IDK WHAT IM DOING HERE */
  return new Promise(function (resolve, reject) {
    resolve(false);
  });
}

function MarkRead(e) {
  const child = e.srcElement.parentNode;
  const parent = e.srcElement.parentNode.parentNode;
  const index = Array.prototype.indexOf.call(parent.children, child);
  books[index].read = !books[index].read;
  localStorage.setItem('books', JSON.stringify(books));
  LoadLibrary();
  DisplayLibrary();
}
