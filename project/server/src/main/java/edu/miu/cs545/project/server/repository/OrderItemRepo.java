package edu.miu.cs545.project.server.repository;

import edu.miu.cs545.project.server.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrderId(Long orderId);

    @Query("SELECT oi.product.id, SUM(oi.quantity) " +
        "FROM OrderItem oi " +
        "WHERE oi.product.id IN :productIds " +
        "GROUP BY oi.product.id")
    List<Object[]> findProductQuantityMapByProductIds(@Param("productIds") List<Long> productIds);
}
