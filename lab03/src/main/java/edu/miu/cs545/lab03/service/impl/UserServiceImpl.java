package edu.miu.cs545.lab03.service.impl;

import edu.miu.cs545.lab03.entity.Comment;
import edu.miu.cs545.lab03.entity.User;
import edu.miu.cs545.lab03.entity.dto.CommentDto;
import edu.miu.cs545.lab03.entity.dto.PostDto;
import edu.miu.cs545.lab03.entity.dto.UserDto;
import edu.miu.cs545.lab03.repository.CommentRepo;
import edu.miu.cs545.lab03.repository.UserRepo;
import edu.miu.cs545.lab03.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final ModelMapper modelMapper;
    private final UserRepo userRepo;
    private final CommentRepo commentRepo;

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
        return userRepo.findUsersWithMoreThanOnePost().stream().map(user -> modelMapper.map(user, UserDto.class)).toList();
    }

    @Override
    public List<UserDto> getUsersHavePosts(int numberOfPosts) {
        return userRepo.findUsersWithMoreThanPosts(numberOfPosts).stream().map(user -> modelMapper.map(user, UserDto.class)).toList();
    }

    @Override
    public List<UserDto> getUsersHaveTitlePosts(String title) {
        return userRepo.findUsersHaveTitlePosts(title).stream().map(user -> modelMapper.map(user, UserDto.class)).toList();
    }

    @Override
    public CommentDto getCommentById(long userId, long postId, long commentId) {
        return modelMapper.map(commentRepo.getCommentByUserIdPostIdCommentId(userId, postId, commentId).orElse(new Comment()), CommentDto.class);
    }
}
