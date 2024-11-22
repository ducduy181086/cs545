package edu.miu.cs545.project.server.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status; // "Pending", "Shipped", "On the way", "Delivered", "Cancelled"

    private Double subtotal;
    private Double totalDiscount;
    private Double tax;
    private Double total;

    private String shippingAddress;
    private String shippingPhone;
    private String billingAddress;
    private String billingPhone;

    private String paymentType;
    private String paymentDetails;
    private String paymentStatus;

    private LocalDateTime orderDate;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private Buyer buyer;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Seller seller;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;
}
