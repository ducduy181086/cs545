package edu.miu.cs545.project.server.repository;

import edu.miu.cs545.project.server.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Long> {
    @Query("SELECT a FROM Admin a WHERE a.user.email = :email")
    Optional<Admin> findAdminByEmail(@Param("email") String email);
}
