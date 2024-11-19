package edu.miu.cs545.project.server.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Buyer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "buyer", cascade = CascadeType.ALL)
    private List<Order> orders;

    @OneToMany(mappedBy = "buyer", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @OneToMany(mappedBy = "buyer", cascade = CascadeType.ALL)
    private List<Payment> payments;

    @OneToOne(mappedBy = "buyer", cascade = CascadeType.ALL)
    private Cart shoppingCart;
}
