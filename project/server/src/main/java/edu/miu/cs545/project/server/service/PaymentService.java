package edu.miu.cs545.project.server.service;

import edu.miu.cs545.project.server.entity.dto.PaymentDto;

public interface PaymentService {
    PaymentDto createPayment(PaymentDto payment);
}
