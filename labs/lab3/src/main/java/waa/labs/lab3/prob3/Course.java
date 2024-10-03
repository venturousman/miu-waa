package waa.labs.lab3.prob3;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

// 3. Create a Bidirectional ManyToMany association between Student and Course using annotations.
@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // default is SEQUENCE
    private int id;
    private String name;
    private LocalDate startDate;

    @ManyToMany
    // JoinTable is optional
    @JoinTable(
            name = "course_students",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private List<Student> students = new ArrayList<>();
}
