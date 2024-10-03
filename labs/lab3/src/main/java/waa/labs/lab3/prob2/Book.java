package waa.labs.lab3.prob2;

import jakarta.persistence.*;
import waa.labs.lab3.prob5.Author;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // default is SEQUENCE
    private int id;
    private String title;
    @Column(length = 25, nullable = false)
    private String isbn;
    private double price;

    // 2. Create an Unidirectional ManyToOne association between Book and Publisher using annotations
    // ManyToOne, default is JoinColumn, can use JoinTable, dont have mappedBy
    @ManyToOne
//    @JoinTable(name = "book_publisher",
//            joinColumns = @JoinColumn(name = "book_id"),
//            inverseJoinColumns = @JoinColumn(name = "publisher_id"))
    private Publisher publisher;

    // 5. Create a Unidirectional OneToOne association between Book and Author using annotations.
    @OneToOne
    private Author author;
}
