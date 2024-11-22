package edu.miu.cs545.project.server.service.impl;

import edu.miu.cs545.project.server.entity.User;
import edu.miu.cs545.project.server.entity.dto.UserDto;
import edu.miu.cs545.project.server.repository.UserRepo;
import edu.miu.cs545.project.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final ModelMapper modelMapper;
    private final UserRepo userRepo;

    @Override
    public List<UserDto> getAll(Sort sort) {
        return userRepo.findAll(sort).stream().map(user -> modelMapper.map(user, UserDto.class)).toList();
    }

    @Override
    public UserDto getById(long id) {
        return modelMapper.map(userRepo.findById(id).orElse(new User()), UserDto.class);
    }
}
