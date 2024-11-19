package edu.miu.cs545.project.server.entity.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserDto {
    long id;
    private String email;
    private List<RoleDto> roles;
}
