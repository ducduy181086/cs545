package edu.miu.cs545.project.server.repository;

import edu.miu.cs545.project.server.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("SELECT s.user FROM Seller s WHERE s.approvedByAdmin IS NULL")
    Page<User> findUnapprovedSeller(Pageable pageable);
}
