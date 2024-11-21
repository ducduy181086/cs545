package edu.miu.cs545.project.server.controller;

import edu.miu.cs545.project.server.entity.dto.AddressDto;
import edu.miu.cs545.project.server.service.AddressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/addresses")
@Tag(name = "Address Management", description = "APIs for managing user addresses")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;

    @Operation(
        summary = "Get All Addresses",
        description = "Retrieve a list of all addresses associated with the current user."
    )
    @GetMapping()
    public List<AddressDto> getUserAddresses() {
        return addressService.getAddresses();
    }

    @Operation(
        summary = "Add a New Address",
        description = "Add a new address for the current user."
    )
    @PostMapping()
    public AddressDto addAddress(@RequestBody AddressDto address) {
        return addressService.saveAddress(address);
    }

    @Operation(
        summary = "Delete an Address",
        description = "Delete an address by its ID. Only addresses belonging to the current user can be deleted."
    )
    @DeleteMapping("/{addressId}")
    public void deleteAddress(@PathVariable Long addressId) {
        addressService.deleteAddress(addressId);
    }
}
