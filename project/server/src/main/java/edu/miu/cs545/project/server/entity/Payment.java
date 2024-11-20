package edu.miu.cs545.project.server.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    private Buyer buyer;

    @Column(nullable = false)
    private String paymentType; // e.g., "Credit Card", "PayPal"

    @Column(nullable = false)
    private String details; // Example: card number, transaction ID

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String status; // e.g., "Completed", "Pending", "Failed"
}
