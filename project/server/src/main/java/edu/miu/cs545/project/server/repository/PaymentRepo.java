package edu.miu.cs545.project.server.repository;

import edu.miu.cs545.project.server.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Long> {
    List<Payment> findByBuyerId(Long buyerId);

    List<Payment> findByStatus(String status);
}
