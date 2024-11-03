package edu.miu.cs545.lab04.repository;

import edu.miu.cs545.lab04.entity.Logger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoggerRepo extends JpaRepository<Logger, Long> {
}
