package waa.labs.lab4.prob2;

import jakarta.persistence.*;

import java.time.LocalDate;

@Embeddable
public class Payment {
    private LocalDate paydate;
    private double amount;
}
