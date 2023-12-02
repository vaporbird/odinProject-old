console.log('123');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = +pages;
    this.read = read? 'read' : 'not read yet'
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
};

Object.prototype.sayHello = () => 'Hello World';

const Book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false)
console.log(Book1);

console.log(Book1.info());
console.log(Book1.sayHello());