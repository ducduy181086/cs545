package edu.miu.cs545.project.server.service.impl;

import edu.miu.cs545.project.server.entity.Address;
import edu.miu.cs545.project.server.entity.Buyer;
import edu.miu.cs545.project.server.entity.dto.AddressDto;
import edu.miu.cs545.project.server.helper.UserHelper;
import edu.miu.cs545.project.server.repository.AddressRepo;
import edu.miu.cs545.project.server.repository.BuyerRepo;
import edu.miu.cs545.project.server.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final ModelMapper modelMapper;
    private final BuyerRepo buyerRepo;
    private final AddressRepo addressRepo;

    @Override
    public List<AddressDto> getAddresses() {
        var buyer = getCurrentBuyer();
        return buyer.map(value -> addressRepo.findByBuyerId(value.getId())
            .stream()
            .map(m -> modelMapper.map(m, AddressDto.class)).collect(Collectors.toList())).orElseGet(ArrayList::new);
    }

    @Override
    public AddressDto saveAddress(AddressDto address) {
        var buyer = getCurrentBuyer();
        if (buyer.isPresent()) {
            var addressEntity = new Address();
            modelMapper.map(address, addressEntity);
            addressEntity.setBuyer(buyer.get());
            var savedEntity = addressRepo.save(addressEntity);
            return modelMapper.map(savedEntity, AddressDto.class);
        }
        return null;
    }

    @Override
    public void deleteAddress(Long addressId) {
        addressRepo.deleteById(addressId);
    }

    private Optional<Buyer> getCurrentBuyer() {
        String username = UserHelper.getCurrentUserName();
        return buyerRepo.findBuyerByEmail(username);
    }
}
