package waa.labs.lab4.prob1;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private LocalDate date;

    @OneToMany(mappedBy = "order")
    private List<OrderLine> orderLines;

    @ManyToOne
    private Customer customer;
}
