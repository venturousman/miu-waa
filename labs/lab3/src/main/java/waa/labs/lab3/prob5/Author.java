package waa.labs.lab3.prob5;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

// 5. Create a Unidirectional OneToOne association between Book and Author using annotations.
@Entity
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // default is SEQUENCE
    private int id;
    private String name;
    private String email;

}
