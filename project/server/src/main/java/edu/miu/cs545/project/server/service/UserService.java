package edu.miu.cs545.project.server.service;

import edu.miu.cs545.project.server.entity.dto.UserDto;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface UserService {
    List<UserDto> getAll(Sort sort);
    UserDto getById(long id);
}
