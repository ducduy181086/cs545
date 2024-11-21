package edu.miu.cs545.project.server.entity.dto;

import lombok.Data;

@Data
public class PaymentDto {
    private Long id;
    private String paymentType; // e.g., "Credit Card", "PayPal"
    private String details; // Example: card number, transaction ID
    private Double amount;
    private String status; // e.g., "Completed", "Pending", "Failed"
}
