package edu.miu.cs545.project.server.repository;

import edu.miu.cs545.project.server.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p " +
            "JOIN p.category c " +
            "JOIN p.seller s " +
            "LEFT JOIN p.compatibleProducts cp " +
            "WHERE (:categoryIds IS NULL OR c.id IN :categoryIds) " +
            "AND (:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) " +
            "AND (:minPrice IS NULL OR p.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR p.price <= :maxPrice) " +
            "AND (:brand IS NULL OR p.brand = :brand) " +
            "AND (:minRating IS NULL OR p.averageRating >= :minRating) " +
            "AND (:inStock IS NULL OR p.inStock = :inStock) " +
            "AND (:isNewArrival IS NULL OR p.isNewArrival = :isNewArrival) " +
            "AND (:isBestSeller IS NULL OR p.isBestSeller = :isBestSeller) " +
            "AND (:type IS NULL OR p.type = :type) " +
            "AND (:color IS NULL OR :color MEMBER OF p.colors) " +
            "AND (:size IS NULL OR :size MEMBER OF p.sizes) " +
            "AND (:material IS NULL OR p.material = :material) " +
            "AND (:features IS NULL OR p.features LIKE %:features%) " +
            "AND (:compatibleProductId IS NULL OR cp.id = :compatibleProductId) " +
            "AND (:modelYear IS NULL OR p.modelYear = :modelYear) " +
            "AND (:deliveryOptions IS NULL OR p.deliveryOptions LIKE %:deliveryOptions%) " +
            "AND (:sellerId IS NULL OR s.id = :sellerId) " +
            "AND (:paymentOptions IS NULL OR EXISTS (SELECT 1 FROM p.paymentOptions po WHERE po IN :paymentOptions)) " +
            "AND (:demographics IS NULL OR p.demographics = :demographics) " +
            "AND (:usage IS NULL OR p.usage LIKE %:usage%) " +
            "AND (:occasion IS NULL OR p.occasion LIKE %:occasion%)")
    Page<Product> filterProducts(
        @Param("name") String name,
        @Param("categoryIds") List<Long> categoryIds,
        @Param("minPrice") Double minPrice,
        @Param("maxPrice") Double maxPrice,
        @Param("brand") String brand,
        @Param("minRating") Double minRating,
        @Param("inStock") Boolean inStock,
        @Param("isNewArrival") Boolean isNewArrival,
        @Param("isBestSeller") Boolean isBestSeller,
        @Param("type") String type,
        @Param("color") String color,
        @Param("size") String size,
        @Param("material") String material,
        @Param("features") String features,
        @Param("compatibleProductId") Long compatibleProductId,
        @Param("modelYear") String modelYear,
        @Param("deliveryOptions") String deliveryOptions,
        @Param("sellerId") Long sellerId,
        @Param("paymentOptions") List<String> paymentOptions,
        @Param("demographics") String demographics,
        @Param("usage") String usage,
        @Param("occasion") String occasion,
        Pageable pageable);

    // Query DISTINCT brands
    @Query("SELECT DISTINCT p.brand FROM Product p ORDER BY p.brand")
    List<String> findDistinctBrands();

    // Query DISTINCT colors
    @Query("SELECT DISTINCT c FROM Product p JOIN p.colors c")
    List<String> findDistinctColors();

    // Query DISTINCT sizes
    @Query("SELECT DISTINCT s FROM Product p JOIN p.sizes s")
    List<String> findDistinctSizes();

    // Query DISTINCT materials
    @Query("SELECT DISTINCT p.material FROM Product p")
    List<String> findDistinctMaterials();
}
