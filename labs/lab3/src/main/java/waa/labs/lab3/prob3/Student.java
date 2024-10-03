package waa.labs.lab3.prob3;

import jakarta.persistence.*;
import waa.labs.lab3.prob6.Major;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // default is SEQUENCE
    private int id;
    private String firstname;
    private String lastname;

    // 3. Create a Bidirectional ManyToMany association between Student and Course using annotations.
    // NOTE: "students" (List<Student> type) is a property name in Course class, must be accurate.
    @ManyToMany(mappedBy = "students")
    private List<Course> courses = new ArrayList<>();

    // 6. Create a Bidirectional OneToOne association between Student and Major using annotations.
    @OneToOne
    private Major major;
}
