package waa.labs.lab2.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class Book {
    private int id;
    private String title;
    private String isbn;
    private double price;
}
