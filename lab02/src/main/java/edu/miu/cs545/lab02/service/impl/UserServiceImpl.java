package edu.miu.cs545.lab02.service.impl;

import edu.miu.cs545.lab02.entity.Post;
import edu.miu.cs545.lab02.entity.User;
import edu.miu.cs545.lab02.entity.dto.PostDto;
import edu.miu.cs545.lab02.entity.dto.UserDto;
import edu.miu.cs545.lab02.repository.UserRepo;
import edu.miu.cs545.lab02.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final ModelMapper modelMapper;
    private final UserRepo userRepo;

    @Override
    public List<UserDto> getAll() {
        return userRepo.findAll().stream().map(user -> modelMapper.map(user, UserDto.class)).toList();
    }

    @Override
    public UserDto getById(long id) {
        return modelMapper.map(userRepo.findById(id).orElse(new User()), UserDto.class);
    }

    @Override
    public void save(UserDto userDto) {
        userRepo.save(modelMapper.map(userDto, User.class));
    }

    @Override
    public List<PostDto> getAllPostByUserId(long userId) {
        return userRepo.getById(userId).getPosts().stream().map(post -> modelMapper.map(post, PostDto.class)).toList();
    }

    @Override
    public List<UserDto> getUsersHavePosts() {
        return userRepo.getUsersByPostsIsNotEmpty().stream().map(user -> modelMapper.map(user, UserDto.class)).toList();
    }
}
