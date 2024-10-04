package waa.labs.lab4.prob1;

import jakarta.persistence.*;

@Entity
@Table(name = "orderlines")
public class OrderLine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int quantity;

    @ManyToOne
    private Order order;

    @ManyToOne
    private Product product;
}
