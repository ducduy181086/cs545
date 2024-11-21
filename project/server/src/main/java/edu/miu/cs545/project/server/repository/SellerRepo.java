package edu.miu.cs545.project.server.repository;

import edu.miu.cs545.project.server.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SellerRepo extends JpaRepository<Seller, Long> {
    @Query("SELECT s FROM Seller s WHERE s.user.email = :email")
    Optional<Seller> findSellerByEmail(@Param("email") String email);
}
