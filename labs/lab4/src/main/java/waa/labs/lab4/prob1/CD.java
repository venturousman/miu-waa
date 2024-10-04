package waa.labs.lab4.prob1;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("cd")
public class CD extends Product {
    private String artist;
}
