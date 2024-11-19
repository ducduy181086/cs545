package edu.miu.cs545.project.server.entity.dto;

import edu.miu.cs545.project.server.entity.RoleType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class RoleDto {
    private Long id;
    @Enumerated(EnumType.STRING)
    private RoleType roleType;
}
