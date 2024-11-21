package edu.miu.cs545.project.server.entity.dto.request;

import lombok.Data;

@Data
public class AddReviewRequest {
    private Long productId;
    private String content;
    private int rating; // Scale 1-5
}
