package waa.labs.lab2.services;

import waa.labs.lab2.models.Book;

import java.util.List;

public interface IBookService {
    List<Book> getBooks();

    Book getBook(int id);

    Book addBook(Book book);

    void updateBook(Book book);

    void deleteBook(Book book);
}
