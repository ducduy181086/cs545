package edu.miu.cs545.project.server.repository;

import edu.miu.cs545.project.server.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepo extends JpaRepository<Address, Long> {
    List<Address> findByBuyerId(Long buyerId);

    List<Address> findByTypeAndBuyerId(String type, Long buyerId);
}
