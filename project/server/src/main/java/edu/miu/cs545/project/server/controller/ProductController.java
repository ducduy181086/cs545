package edu.miu.cs545.project.server.controller;

import edu.miu.cs545.project.server.entity.dto.ProductDto;
import edu.miu.cs545.project.server.entity.dto.ReviewDto;
import edu.miu.cs545.project.server.entity.dto.request.AddReviewRequest;
import edu.miu.cs545.project.server.entity.dto.request.SaveProductRequest;
import edu.miu.cs545.project.server.entity.dto.response.FilterConfigResponse;
import edu.miu.cs545.project.server.service.CategoryService;
import edu.miu.cs545.project.server.service.ProductService;
import edu.miu.cs545.project.server.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final ReviewService reviewService;
    private final CategoryService categoryService;

    @GetMapping()
    public ResponseEntity<Page<ProductDto>> filterProducts(
        @RequestParam(name="categoryids", required = false) List<Long> categoryIds, // Accept categoryIds as list
        @RequestParam(name="minprice", required = false) Double minPrice,
        @RequestParam(name="maxprice", required = false) Double maxPrice,
        @RequestParam(required = false) String brand,
        @RequestParam(name="minrating", required = false) Double minRating,
        @RequestParam(name="instock", required = false) Boolean inStock,
        @RequestParam(name="isnewarrival", required = false) Boolean isNewArrival,
        @RequestParam(name="isbestseller", required = false) Boolean isBestSeller,
        @RequestParam(required = false) String type,
        @RequestParam(required = false) String color,
        @RequestParam(required = false) String size,
        @RequestParam(required = false) String material,
        @RequestParam(required = false) String features,
        @RequestParam(name="compatibleproductid", required = false) Long compatibleProductId,
        @RequestParam(name="modelyear", required = false) String modelYear,
        @RequestParam(name="deliveryoptions", required = false) String deliveryOptions,
        @RequestParam(name="sellerid", required = false) Long sellerId,
        @RequestParam(name="paymentoptions", required = false) List<String> paymentOptions,
        @RequestParam(required = false) String demographics,
        @RequestParam(required = false) String usage,
        @RequestParam(required = false) String occasion,
        @RequestParam(name="page", defaultValue = "0") int page,
        @RequestParam(name="pagesize", defaultValue = "10") int pageSize) {

        Pageable pageable = PageRequest.of(page, pageSize);
        Page<ProductDto> products = productService.filterProducts(
            categoryIds, minPrice, maxPrice, brand, minRating, inStock,
            isNewArrival, isBestSeller, type, color, size, material, features,
            compatibleProductId, modelYear, deliveryOptions, sellerId, paymentOptions,
            demographics, usage, occasion, pageable);

        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getById(@PathVariable Long id) {
        ProductDto product =  productService.getProductById(id);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        product.setRatings(reviewService.countReviewsByRating(id));
        return ResponseEntity.ok(product);
    }

    @GetMapping("/filter-config")
    public FilterConfigResponse getConfig() {
        var r = productService.getFilterConfig();
        r.setCategories(categoryService.getAllCategories());
        return r;
    }

    @GetMapping("/{id}/compatibility")
    public List<ProductDto> getCompatibilityProducts(@PathVariable Long id) {
        return productService.getCompatibilityProducts(id);
    }

    @PostMapping()
    public void create(@RequestBody SaveProductRequest product) {
        productService.saveProduct(product);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody SaveProductRequest product) {
        product.setId(id);
        productService.saveProduct(product);
    }

    @PutMapping("/{id}/compatibility/{compatibilityProductId}")
    public void addCompatibilityProduct(@PathVariable Long id, @PathVariable Long compatibilityProductId) {
        productService.setCompatibilityProduct(id, compatibilityProductId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @DeleteMapping("/{id}/compatibility/{compatibilityProductId}")
    public void deleteCompatibilityProduct(@PathVariable Long id, @PathVariable Long compatibilityProductId) {
        productService.removeCompatibilityProduct(id, compatibilityProductId);
    }

    // Reviews part
    @GetMapping("/{id}/reviews")
    public Page<ReviewDto> getReviews(@PathVariable Long id,
        @RequestParam(name="page", defaultValue = "0") int page,
        @RequestParam(name="pagesize", defaultValue = "10") int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        return reviewService.getReviewsForProduct(id, pageable);
    }

    @PostMapping("/{id}/reviews")
    public ReviewDto addReview(
        @PathVariable Long id,
        @RequestBody AddReviewRequest review) {
        review.setProductId(id);
        return reviewService.addReview(review);
    }
}
