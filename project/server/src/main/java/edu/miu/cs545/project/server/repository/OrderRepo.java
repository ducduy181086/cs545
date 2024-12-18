package edu.miu.cs545.project.server.repository;

import edu.miu.cs545.project.server.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
    Page<Order> findByBuyerId(Long buyerId, Pageable pageable);
    Page<Order> findByBuyerIdAndStatus(Long buyerId, String status, Pageable pageable);

    Page<Order> findBySellerId(Long sellerId, Pageable pageable);
    Page<Order> findBySellerIdAndStatus(Long sellerId, String status, Pageable pageable);
}
