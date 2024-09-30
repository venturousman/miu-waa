package com.labs.lab1.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Book {
    private int id;
    private String title;
    private String isbn;
//    private String description;
}
