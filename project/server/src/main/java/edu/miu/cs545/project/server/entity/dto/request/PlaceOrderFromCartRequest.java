package edu.miu.cs545.project.server.entity.dto.request;

import edu.miu.cs545.project.server.entity.dto.AddressDto;
import lombok.Data;

@Data
public class PlaceOrderFromCartRequest {
    private String customerName;
    private String shippingAddress;
    private String shippingPhone;
    private String billingAddress;
    private String billingPhone;

    private String paymentType;
    private String paymentDetails;
    private String paymentStatus;
}
