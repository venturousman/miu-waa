package com.labs.lab1.controller;

import com.labs.lab1.model.Book;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

@RestController
public class HomeController {

    @GetMapping("/books")
    public Collection<Book> getBooks() {
        return List.of(
                new Book(1, "abc", "isbn1"),
                new Book(2, "xyz", "isbn2")
        );
    }

    @GetMapping("/")
    public String lab1() {
        return "Lab 1";
    }
}
