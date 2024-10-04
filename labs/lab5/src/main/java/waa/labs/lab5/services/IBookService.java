package waa.labs.lab5.services;

import waa.labs.lab5.models.Book;

import java.util.List;
import java.util.stream.Stream;

public interface IBookService {
    List<Book> getBooks();

    Stream<Book> getBooksStream();

    Book getBookById(int id);

    Book addBook(Book book);

    void updateBook(Book book);

    void deleteBook(Book book);

    List<Book> findByTitleContaining(String title);

    List<Book> findByPriceGreaterThanEqual(double price);
}