package waa.labs.lab5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import waa.labs.lab5.models.Book;
import waa.labs.lab5.repositories.IBookRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service  // Make sure this annotation is present, to be autowire
public class BookService implements IBookService {

    @Autowired
    private IBookRepository bookRepository;
//    private final List<Book> books;

//    public BookService() {
//        books = new ArrayList<>();
//        books.add(new Book(1, "Beginning Java 8 Fundamentals", "isbn-1", 49));
//        books.add(new Book(2, "Java 8 in Action", "isbn-2", 37));
//        books.add(new Book(3, "UML Distilled 3rd Ed", "isbn-3", 26));
//    }

    @Override
    public List<Book> getBooks() {
        var iterableBooks = bookRepository.findAll();
        var books = StreamSupport.stream(iterableBooks.spliterator(), false)
                .collect(Collectors.toList());
        return books;
    }

    @Override
    public Stream<Book> getBooksStream() {
        var iterableBooks = bookRepository.findAll();
        var books = StreamSupport.stream(iterableBooks.spliterator(), false);
        return books;
    }

    @Override
    public Book getBookById(int id) {
//        return this.books
//                .stream()
//                .filter(b -> b.getId() == id)
//                .findFirst()
//                .orElse(null);
        var book = bookRepository.findById(id).orElse(null);
        return book;
    }

    @Override
    public Book addBook(Book book) {
//        int maxId = books.stream()
//                .mapToInt(Book::getId)
//                .max().orElse(0);
//        int newId = maxId + 1;
//        book.setId(newId);
//        books.add(book);
//        return book;
        var newBook = bookRepository.save(book);
        return newBook;
    }

    @Override
    public void updateBook(Book book) {
//        var updatingBook = books.stream()
//                .filter(b -> b.getId() == book.getId())
//                .findFirst()
//                .get();
////        updatingBook.setId(book.getId());
//        updatingBook.setTitle(book.getTitle());
//        updatingBook.setPrice(book.getPrice());
//        updatingBook.setIsbn(book.getIsbn());
        bookRepository.save(book);
    }

    @Override
    public void deleteBook(Book book) {
//        books.remove(book);
        bookRepository.delete(book);
    }

    @Override
    public List<Book> findByTitleContaining(String title) {
        return bookRepository.findByTitleContaining(title);
    }

    @Override
    public List<Book> findByPriceGreaterThanEqual(double price) {
        return bookRepository.findByPriceGreaterThanEqual(price);
    }
}