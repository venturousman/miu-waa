package waa.labs.lab3.prob6;

import jakarta.persistence.*;
import waa.labs.lab3.prob3.Student;

// 6. Create a Bidirectional OneToOne association between Student and Major using annotations.
@Entity
public class Major {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // default is SEQUENCE
    private int id;
    private String name;

    // NOTE: "major" is a property name (type Major) in Student class, must be accurate.
    @OneToOne(mappedBy = "major")
    private Student student;
}
