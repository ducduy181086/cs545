package edu.miu.cs545.project.server.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    private double price;
    private double discount; // % or value reduce
    private String brand;
    private String type;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Seller seller;

    private double averageRating;
    private int reviewCount;
    private boolean inStock;
    private boolean isNewArrival;
    private boolean isBestSeller;

    @ElementCollection
    @Fetch(FetchMode.SUBSELECT)
    private List<String> colors;

    @ElementCollection
    @Fetch(FetchMode.SUBSELECT)
    private List<String> sizes;

    private String material;
    private String features;
    @ManyToMany
    @JoinTable(
        name = "product_compatibility",
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "compatible_product_id")
    )
    @Fetch(FetchMode.SUBSELECT)
    private List<Product> compatibleProducts = new ArrayList<>();
    private String modelYear;

    private String deliveryOptions; // Example: "US, CA, EU"
    @ElementCollection
    @Fetch(FetchMode.SUBSELECT)
    private List<String> paymentOptions;

    private String demographics;
    private String usage;
    private String occasion;
}
