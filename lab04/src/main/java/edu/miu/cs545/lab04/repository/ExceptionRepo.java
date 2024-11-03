package edu.miu.cs545.lab04.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExceptionRepo extends JpaRepository<edu.miu.cs545.lab04.entity.Exception, Long> {
}
