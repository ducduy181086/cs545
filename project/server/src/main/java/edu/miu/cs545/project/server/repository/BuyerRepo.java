package edu.miu.cs545.project.server.repository;

import edu.miu.cs545.project.server.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BuyerRepo extends JpaRepository<Buyer, Long> {
    @Query("SELECT b FROM Buyer b WHERE b.user.email = :email")
    Optional<Buyer> findBuyerByEmail(@Param("email") String email);
}
