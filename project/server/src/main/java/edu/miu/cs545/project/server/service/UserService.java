package edu.miu.cs545.project.server.service;

import edu.miu.cs545.project.server.entity.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAll();
    UserDto getById(long id);
}
