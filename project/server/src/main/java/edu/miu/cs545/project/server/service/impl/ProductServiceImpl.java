package edu.miu.cs545.project.server.service.impl;

import edu.miu.cs545.project.server.entity.Category;
import edu.miu.cs545.project.server.entity.Product;
import edu.miu.cs545.project.server.entity.dto.ProductDto;
import edu.miu.cs545.project.server.entity.dto.request.SaveProductRequest;
import edu.miu.cs545.project.server.entity.dto.response.FilterConfigResponse;
import edu.miu.cs545.project.server.helper.UserHelper;
import edu.miu.cs545.project.server.repository.*;
import edu.miu.cs545.project.server.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ModelMapper modelMapper;
    private final ProductRepo productRepo;
    private final CategoryRepo categoryRepo;
    private final SellerRepo sellerRepo;
    private final OrderItemRepo orderItemRepo;

    @Override
    public Page<ProductDto> filterProducts(
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
        Pageable pageable) {
        Set<Long> allCategoryIds = new HashSet<>();
        if (categoryIds != null && !categoryIds.isEmpty()) {
            for (Long categoryId : categoryIds) {
                Category category = categoryRepo.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));
                allCategoryIds.add(category.getId());
                category.getSubCategories().forEach(subCategory -> allCategoryIds.add(subCategory.getId()));
            }
        }
        Page<Product> products = productRepo.filterProducts(allCategoryIds.isEmpty() ? null : new ArrayList<>(allCategoryIds),
            minPrice, maxPrice, brand, minRating, inStock, isNewArrival, isBestSeller, type, color, size,
            material, features, compatibleProductId, modelYear, deliveryOptions, sellerId,
            paymentOptions, demographics, usage, occasion, pageable);
        var productIds = products.stream().map(m -> m.getId()).toList();
        var map = getProductQuantityMap(productIds);
        return products.map(product -> {
            var result = modelMapper.map(product, ProductDto.class);
            if (map.containsKey(result.getId())) {
                var quantity = map.get(product.getId());
                var canDelete = quantity == null || quantity == 0;
                result.setCanDelete(canDelete);
            }
            return result;
        });
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product = productRepo.findById(id).orElse(null);
        if (product != null) {
            var result = modelMapper.map(product, ProductDto.class);
            var map = getProductQuantityMap(List.of(product.getId()));
            var quantity = map.get(product.getId());
            var canDelete = quantity == null || quantity == 0;
            result.setCanDelete(canDelete);
            return result;
        }
        return null;
    }

    @Override
    public void saveProduct(SaveProductRequest product) {
        Product productEntity;
        if (product.getId() == 0) {
            productEntity = new Product();
            String username = UserHelper.getCurrentUserName();
            var seller = sellerRepo.findSellerByEmail(username);
            if (seller.isEmpty()) return;
            productEntity.setSeller(seller.get());
        }
        else {
            productEntity = productRepo.findById(product.getId()).orElse(null);
        }
        if (productEntity != null) {
            modelMapper.map(product, productEntity);
            productEntity.setInStock(product.getQuantity() > 0);
            if (product.getCcategoryId() != null && product.getCcategoryId() > 0) {
                categoryRepo.findById(product.getCcategoryId()).ifPresent(productEntity::setCategory);
            }
            else {
                productEntity.setCategory(null);
            }
            productRepo.save(productEntity);
        }
    }

    @Override
    public void deleteProduct(Long id) {
        productRepo.findById(id).ifPresent(productRepo::delete);
    }

    @Override
    public List<ProductDto> getCompatibilityProducts(Long id) {
        var product = productRepo.findById(id);
        if (product.isPresent()) {
            var items = product.get().getCompatibleProducts();
            return items.stream()
                .map(item -> modelMapper.map(item, ProductDto.class))
                .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    @Override
    public void setCompatibilityProduct(Long id, Long compatibilityProductId) {
        var product = productRepo.findById(id).orElseThrow();
        var compatibilityProduct = productRepo.findById(compatibilityProductId).orElseThrow();
        product.getCompatibleProducts().add(compatibilityProduct);
        productRepo.save(product);
    }

    @Override
    public void removeCompatibilityProduct(Long id, Long compatibilityProductId) {
        var product = productRepo.findById(id).orElseThrow();
        var compatibilityProduct = productRepo.findById(compatibilityProductId).orElseThrow();
        product.getCompatibleProducts().add(compatibilityProduct);
        productRepo.save(product);
    }

    @Override
    public FilterConfigResponse getFilterConfig() {
        FilterConfigResponse filterConfig = new FilterConfigResponse();
        filterConfig.setBrands(productRepo.findDistinctBrands());
        filterConfig.setColors(productRepo.findDistinctColors());
        filterConfig.setSizes(productRepo.findDistinctSizes());
        filterConfig.setMaterials(productRepo.findDistinctMaterials());

        return filterConfig;
    }

    private Map<Long, Integer> getProductQuantityMap(List<Long> productIds) {
        List<Object[]> results = orderItemRepo.findProductQuantityMapByProductIds(productIds);

        // Convert List<Object[]> to Map<Long, Integer>
        return results.stream()
            .collect(Collectors.toMap(
                result -> (Long) result[0],  // productId
                result -> ((Long) result[1]).intValue() // quantity as Integer
            ));
    }
}
