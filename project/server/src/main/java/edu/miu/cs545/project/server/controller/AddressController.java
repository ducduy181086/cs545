package edu.miu.cs545.project.server.controller;

import edu.miu.cs545.project.server.entity.dto.AddressDto;
import edu.miu.cs545.project.server.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/addresses")
@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;

    @GetMapping()
    public List<AddressDto> getUserAddresses() {
        return addressService.getAddresses();
    }

    @PostMapping()
    public AddressDto addAddress(@RequestBody AddressDto address) {
        return addressService.saveAddress(address);
    }

    @DeleteMapping("/{addressId}")
    public void deleteAddress(@PathVariable Long addressId) {
        addressService.deleteAddress(addressId);
    }
}
