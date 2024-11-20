package edu.miu.cs545.project.server.entity.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ProductDto {
    private Long id;

    private String name;
    private String description;
    private String imageUrl;

    private int quantity;
    private double price;
    private double discount; // % or value reduce
    private String brand;
    private String type;

    private CategoryDto category;

    private Map<Integer, Long> ratings;
    private double averageRating;
    private int reviewCount;
    private boolean inStock;
    private boolean isNewArrival;
    private boolean isBestSeller;

    private List<String> colors;
    private List<String> sizes;

    private String material;
    private String features;
    private String modelYear;

    private String deliveryOptions;
    private List<String> paymentOptions;

    private String demographics;
    private String usage;
    private String occasion;
}
