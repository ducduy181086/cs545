package edu.miu.cs545.project.server.repository;

import edu.miu.cs545.project.server.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepo extends JpaRepository<Review, Long> {
    @Query("SELECT r FROM Review r WHERE r.product.id = :productId AND r.deletedByAdmin IS NULL")
    Page<Review> findAllByProductIdAndNotDeleted(@Param("productId") Long productId, Pageable pageable);

    @Query("SELECT COUNT(r), SUM(r.rating) " +
        "FROM Review r " +
        "WHERE r.product.id = :productId AND r.deletedByAdmin IS NULL")
    Object[] countAndSumRatingsByProductId(@Param("productId") Long productId);
}