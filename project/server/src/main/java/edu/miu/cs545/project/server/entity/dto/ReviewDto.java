package edu.miu.cs545.project.server.entity.dto;

import lombok.Data;

@Data
public class ReviewDto {
    private Long id;
    private String content;
    private int rating; // Scale 1-5
}
