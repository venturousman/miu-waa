package waa.labs.lab2.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import waa.labs.lab2.models.Book;
import waa.labs.lab2.services.IBookService;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    private final IBookService bookService;

    //    @Autowired
    public BookController(IBookService bookService) {
        this.bookService = bookService;
    }

    // 1. GET /books - return a List of books
    @GetMapping
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    //2. GET /books/{id} - return a single book by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookById(@PathVariable int id) {
        Book book = bookService.getBook(id);
        if (book == null) {
//            return ResponseEntity.notFound().build();
            String message = "Book not found with ID: " + id;
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(book);
    }

    //3. POST /books - add a new book
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    //4. PUT /books/{id} - update a book by id
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable int id, @RequestBody Book book) {
        Book foundBook = bookService.getBook(id);
        if (foundBook == null) {
            String message = "Book not found with ID: " + id;
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
        book.setId(id);
        bookService.updateBook(book);
        return new ResponseEntity<>("Update successfully", HttpStatus.OK);
    }

    //5. DELETE /books/{id} - delete a book by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable int id) {
        Book book = bookService.getBook(id);
        if (book == null) {
            String message = "Book not found with ID: " + id;
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
        bookService.deleteBook(book);
        return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
    }

    // 6. Add 4 types of versioning.
    // Media type versioning
    @GetMapping(value = "/search", produces = "application/v1+json")
    public List<Book> search(@RequestParam String title) {
        return bookService.getBooks().stream().filter(b -> b.getTitle().contains(title)).toList();
    }

    @GetMapping(value = "/search", produces = "application/v2+json")
    public List<Book> search(@RequestParam double price) {
        return bookService.getBooks().stream().filter(b -> b.getPrice() >= price).toList();
    }

    // Header versioning
    @GetMapping(value = "/search1", headers = "X-API-VERSION=1")
    public List<Book> search1(@RequestParam String title) {
        return bookService.getBooks().stream().filter(b -> b.getTitle().contains(title)).toList();
    }

    @GetMapping(value = "/search1", headers = "X-API-VERSION=2")
    public List<Book> search1(@RequestParam double price) {
        return bookService.getBooks().stream().filter(b -> b.getPrice() >= price).toList();
    }

    // URL versioning
    @GetMapping("/v1/search2")
    public List<Book> search2(@RequestParam String title) {
        return bookService.getBooks().stream().filter(b -> b.getTitle().contains(title)).toList();
    }

    @GetMapping("/v2/search2")
    public List<Book> search2(@RequestParam double price) {
        return bookService.getBooks().stream().filter(b -> b.getPrice() >= price).toList();
    }

    // Parameter versioning
    @GetMapping(value = "/list", params = "version=1")
    public List<Book> getBooks2a() {
        return bookService.getBooks().stream().sorted(Comparator.comparingDouble(Book::getPrice)).toList();
    }

    @GetMapping(value = "/list", params = "version=2")
    public List<Book> getBooks2b() {
        return bookService.getBooks().stream().sorted(Comparator.comparing(Book::getTitle)).toList();
    }
}
