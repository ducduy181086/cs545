package edu.miu.cs545.project.server.controller;

import edu.miu.cs545.project.server.entity.dto.ReviewDto;
import edu.miu.cs545.project.server.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/deleted")
    public Page<ReviewDto> getDeletedReviews(
        @RequestParam(name="page", defaultValue = "0") int page,
        @RequestParam(name="pagesize", defaultValue = "10") int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        return reviewService.getDeletedReviews(pageable);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        reviewService.deleteReview(id);
    }
}
