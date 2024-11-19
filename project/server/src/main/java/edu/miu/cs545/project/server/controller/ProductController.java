package edu.miu.cs545.project.server.controller;

import edu.miu.cs545.project.server.entity.dto.ProductDto;
import edu.miu.cs545.project.server.entity.dto.request.SaveProductRequest;
import edu.miu.cs545.project.server.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

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
        return ResponseEntity.ok(product);
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

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
