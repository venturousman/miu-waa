package waa.labs.lab3.prob1;

import jakarta.persistence.*;

// 1. Create a Bidirectional OneToMany association between Department and Employee using annotations.
@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // default is SEQUENCE
    private int id;
    //    @Column(name = "firstname", nullable = false)
    @Column(name = "firstname")
    private String firstName;
    private String lastname;

    // ManyToOne, default is JoinColumn, can use JoinTable, dont have mappedBy
    // Many Employees belong to One Department
    @ManyToOne
    private Department department;
}
