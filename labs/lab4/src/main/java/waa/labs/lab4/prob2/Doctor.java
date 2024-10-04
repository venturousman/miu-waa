package waa.labs.lab4.prob2;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String doctortype;
    private String firstname;
    private String lastname;

    @OneToMany(mappedBy = "doctor")
    private List<Appointment> appointments;
}
