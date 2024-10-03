package waa.labs.lab3.prob4;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

// 4. Create a Unidirectional OneToMany association between Customer and Reservation using annotations.
@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // default is SEQUENCE
    private int id;
    private LocalDate reservedDate;
    private int numberCustomer;
}
