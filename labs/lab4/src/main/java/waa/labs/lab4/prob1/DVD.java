package waa.labs.lab4.prob1;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("dvd")
public class DVD extends Product {
    private String genre;
}
