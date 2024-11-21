package edu.miu.cs545.project.server.service;

import edu.miu.cs545.project.server.entity.dto.ReviewDto;
import edu.miu.cs545.project.server.entity.dto.request.AddReviewRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewService {
    Page<ReviewDto> getReviewsForProduct(Long productId, Pageable pageable);
    ReviewDto addReview(AddReviewRequest review);
    void deleteReview(Long reviewId);
}
