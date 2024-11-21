package edu.miu.cs545.project.server.entity.dto;

import lombok.Data;

@Data
public class AddressDto {
    private Long id;
    private String type; // e.g., "Billing", "Shipping"
    private String address;
    private String phone;
}
