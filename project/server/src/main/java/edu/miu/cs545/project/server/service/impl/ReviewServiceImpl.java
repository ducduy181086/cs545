package edu.miu.cs545.project.server.service.impl;

import edu.miu.cs545.project.server.entity.Admin;
import edu.miu.cs545.project.server.entity.Buyer;
import edu.miu.cs545.project.server.entity.Review;
import edu.miu.cs545.project.server.entity.dto.ReviewDto;
import edu.miu.cs545.project.server.entity.dto.request.AddReviewRequest;
import edu.miu.cs545.project.server.helper.UserHelper;
import edu.miu.cs545.project.server.repository.AdminRepo;
import edu.miu.cs545.project.server.repository.BuyerRepo;
import edu.miu.cs545.project.server.repository.ProductRepo;
import edu.miu.cs545.project.server.repository.ReviewRepo;
import edu.miu.cs545.project.server.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ModelMapper modelMapper;
    private final ReviewRepo reviewRepo;
    private final ProductRepo productRepo;
    private final BuyerRepo buyerRepo;
    private final AdminRepo adminRepo;

    @Override
    public Page<ReviewDto> getReviewsForProduct(Long productId, Pageable pageable) {
        var items = reviewRepo.findAllByProductIdAndNotDeleted(productId, pageable);
        return items.map(m -> modelMapper.map(m, ReviewDto.class));
    }

    @Override
    public ReviewDto addReview(AddReviewRequest review) {
        var reviewEntity = new Review();
        modelMapper.map(review, reviewEntity);
        getCurrentBuyer().ifPresent(reviewEntity::setBuyer);
        var product = productRepo.findById(review.getProductId()).orElseThrow();
        reviewEntity.setProduct(product);
        Object[] result = reviewRepo.countAndSumRatingsByProductId(product.getId()).get(0);
        long reviewsCount = (Long) result[0] + 1;
        Long sum = (Long) result[1];
        long sumValue = (sum == null ? 0 : sum) + review.getRating();
        var savedEntity = reviewRepo.save(reviewEntity);

        product.setReviewCount((int) reviewsCount);
        product.setAverageRating((double) sumValue / reviewsCount);
        productRepo.save(product);

        return modelMapper.map(savedEntity, ReviewDto.class);
    }

    @Override
    public void deleteReview(Long reviewId) {
        Review review = reviewRepo.findById(reviewId)
            .orElseThrow(() -> new IllegalArgumentException("Review not found"));
        var admin = getCurrentAdmin().orElseThrow();
        review.setDeletedByAdmin(admin);

        var product = review.getProduct();
        Object[] result = reviewRepo.countAndSumRatingsByProductId(product.getId()).get(0);
        long reviewsCount = (Long) result[0] - 1;
        Long sum = (Long) result[1];
        long sumValue = (sum == null ? 0 : sum) - review.getRating();

        reviewRepo.save(review);
        product.setReviewCount((int) reviewsCount);
        product.setAverageRating((double) sumValue / reviewsCount);
        productRepo.save(product);
    }

    @Override
    public Map<Integer, Long> countReviewsByRating(Long productId) {
        List<Object[]> results = reviewRepo.countReviewsByRating(productId);
        return results.stream()
            .collect(Collectors.toMap(
                result -> (Integer) result[0], // Rating
                result -> (Long) result[1]    // Count
            ));
    }

    @Override
    public Page<ReviewDto> getDeletedReviews(Pageable pageable) {
        return reviewRepo.findDeletedReviews(pageable)
            .map(m -> modelMapper.map(m, ReviewDto.class));
    }

    private Optional<Buyer> getCurrentBuyer() {
        String username = UserHelper.getCurrentUserName();
        return buyerRepo.findBuyerByEmail(username);
    }

    private Optional<Admin> getCurrentAdmin() {
        String username = UserHelper.getCurrentUserName();
        return adminRepo.findAdminByEmail(username);
    }
}
