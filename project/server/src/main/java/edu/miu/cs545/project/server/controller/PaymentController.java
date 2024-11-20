package edu.miu.cs545.project.server.controller;

import edu.miu.cs545.project.server.entity.dto.PaymentDto;
import edu.miu.cs545.project.server.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/create")
    public PaymentDto createPayment(@RequestBody PaymentDto payment) {
        return paymentService.createPayment(payment);
    }
}
