package edu.miu.cs545.project.server.service;

import edu.miu.cs545.project.server.entity.dto.ProductDto;
import edu.miu.cs545.project.server.entity.dto.request.SaveProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    Page<ProductDto> filterProducts(
        List<Long> categoryIds,
        Double minPrice,
        Double maxPrice,
        String brand,
        Double minRating,
        Boolean inStock,
        Boolean isNewArrival,
        Boolean isBestSeller,
        String type,
        String color,
        String size,
        String material,
        String features,
        Long compatibleProductId,
        String modelYear,
        String deliveryOptions,
        Long sellerId,
        List<String> paymentOptions,
        String demographics,
        String usage,
        String occasion,
        Pageable pageable);
    ProductDto getProductById(Long id);
    void saveProduct(SaveProductRequest product);
    void deleteProduct(Long id);
    List<ProductDto> getCompatibilityProducts(Long id);
    void setCompatibilityProduct(Long id, Long compatibilityProductId);
    void removeCompatibilityProduct(Long id, Long compatibilityProductId);
}
