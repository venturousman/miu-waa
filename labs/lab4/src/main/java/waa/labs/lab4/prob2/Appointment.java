package waa.labs.lab4.prob2;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDate appdate;

    @ManyToOne
    private Patient patient;

    @ManyToOne
    private Doctor doctor;

    @Embedded
    private Payment payment;
}
