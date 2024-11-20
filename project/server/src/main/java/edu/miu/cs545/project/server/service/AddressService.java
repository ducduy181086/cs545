package edu.miu.cs545.project.server.service;

import edu.miu.cs545.project.server.entity.dto.AddressDto;

import java.util.List;

public interface AddressService {
    List<AddressDto> getAddresses();
    AddressDto saveAddress(AddressDto address);
    void deleteAddress(Long addressId);
}
