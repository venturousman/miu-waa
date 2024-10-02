package waa.labs.lab2.services;

import org.springframework.stereotype.Service;
import waa.labs.lab2.models.Book;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service  // Make sure this annotation is present, to be autowire
public class BookService implements IBookService {

    private final List<Book> books;

    public BookService() {
        books = new ArrayList<>();
        books.add(new Book(1, "Beginning Java 8 Fundamentals", "isbn-1", 49));
        books.add(new Book(2, "Java 8 in Action", "isbn-2", 37));
        books.add(new Book(3, "UML Distilled 3rd Ed", "isbn-3", 26));
    }

    @Override
    public List<Book> getBooks() {
        return books;
    }

    @Override
    public Book getBook(int id) {
        return this.books
                .stream()
                .filter(b -> b.getId() == id)
                .findFirst()
                .orElse(null);
    }

    @Override
    public Book addBook(Book book) {
        int maxId = books.stream()
                .mapToInt(Book::getId)
                .max().orElse(0);
        int newId = maxId + 1;
        book.setId(newId);
        books.add(book);
        return book;
    }

    @Override
    public void updateBook(Book book) {
        var updatingBook = books.stream()
                .filter(b -> b.getId() == book.getId())
                .findFirst()
                .get();
//        updatingBook.setId(book.getId());
        updatingBook.setTitle(book.getTitle());
        updatingBook.setPrice(book.getPrice());
        updatingBook.setIsbn(book.getIsbn());
    }

    @Override
    public void deleteBook(Book book) {
        books.remove(book);
    }
}
