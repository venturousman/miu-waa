package waa.labs.lab3.prob4;

import jakarta.persistence.*;

import java.util.List;

// 4. Create a Unidirectional OneToMany association between Customer and Reservation using annotations.
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // default is SEQUENCE
    private int id;
    private String firstname;
    private String lastname;
    private String phonenumber;

    // OneToMany, default is JoinTable, can skip with mappedBy=...
    @OneToMany
    @JoinTable(name = "customer_reservations",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "reservation_id"))
    private List<Reservation> reservations;
}
