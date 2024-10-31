package edu.miu.cs545.lab02.service;

import edu.miu.cs545.lab02.entity.dto.PostDto;
import edu.miu.cs545.lab02.entity.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAll();
    UserDto getById(long id);
    void save(UserDto userDto);
    List<PostDto> getAllPostByUserId(long userId);
    List<UserDto> getUsersHavePosts();
}
