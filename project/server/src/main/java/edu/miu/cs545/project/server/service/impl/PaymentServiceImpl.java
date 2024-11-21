package edu.miu.cs545.project.server.service.impl;

import edu.miu.cs545.project.server.entity.Buyer;
import edu.miu.cs545.project.server.entity.Payment;
import edu.miu.cs545.project.server.entity.dto.PaymentDto;
import edu.miu.cs545.project.server.helper.UserHelper;
import edu.miu.cs545.project.server.repository.BuyerRepo;
import edu.miu.cs545.project.server.repository.PaymentRepo;
import edu.miu.cs545.project.server.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final ModelMapper modelMapper;
    private final BuyerRepo buyerRepo;
    private final PaymentRepo paymentRepo;

    @Override
    public PaymentDto createPayment(PaymentDto payment) {
        payment.setId(0L);
        var paymentEntity = modelMapper.map(payment, Payment.class);
        var buyer = getCurrentBuyer();
        if (buyer.isPresent()) {
            paymentEntity.setBuyer(buyer.get());
            paymentEntity.setStatus("PENDING");
            paymentRepo.save(paymentEntity);
        }
        return null;
    }

    private Optional<Buyer> getCurrentBuyer() {
        String username = UserHelper.getCurrentUserName();
        return buyerRepo.findBuyerByEmail(username);
    }
}
