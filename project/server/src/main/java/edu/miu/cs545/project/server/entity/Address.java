package edu.miu.cs545.project.server.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private Buyer buyer;

    @Column(nullable = false)
    private String type; // e.g., "Billing", "Shipping"

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String phone;
}
