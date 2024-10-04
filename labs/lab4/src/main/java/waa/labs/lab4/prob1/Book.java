package waa.labs.lab4.prob1;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("book")
public class Book extends Product {
    private String title;
}
