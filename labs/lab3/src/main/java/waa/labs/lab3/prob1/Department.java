package waa.labs.lab3.prob1;

import jakarta.persistence.*;

import java.util.List;

// 1. Create a Bidirectional OneToMany association between Department and Employee using annotations.
@Entity
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // default is SEQUENCE
    private int id;
    private String name;

    // OneToMany, default is JoinTable, can skip with mappedBy=...
    // One Department can have many Employees
//    @OneToMany
//    @JoinTable(name = "dept_emp",
//            joinColumns = @JoinColumn(name = "dept_id"),
//            inverseJoinColumns = @JoinColumn(name = "emp_id"))
    @OneToMany(mappedBy = "department")
    // unless use mappedBy, will have both JoinColumn (department_id in employee table) and JoinTable (dept_emp table)
    private List<Employee> employees;
}
