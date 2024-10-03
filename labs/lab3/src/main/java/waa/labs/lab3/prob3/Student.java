package waa.labs.lab3.prob3;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

// 3. Create a Bidirectional ManyToMany association between Student and Course using annotations.
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // default is SEQUENCE
    private int id;
    private String firstname;
    private String lastname;

    // NOTE: "students" is in Course class, must be accurate.
    @ManyToMany(mappedBy = "students")
    private List<Course> courses = new ArrayList<>();
}
