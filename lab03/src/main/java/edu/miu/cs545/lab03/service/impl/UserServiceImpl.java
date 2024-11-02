package edu.miu.cs545.lab03.service.impl;

import edu.miu.cs545.lab03.entity.Comment;
import edu.miu.cs545.lab03.entity.Post;
import edu.miu.cs545.lab03.entity.User;
import edu.miu.cs545.lab03.entity.dto.CommentDto;
import edu.miu.cs545.lab03.entity.dto.PostDto;
import edu.miu.cs545.lab03.entity.dto.UserDto;
import edu.miu.cs545.lab03.repository.CommentRepo;
import edu.miu.cs545.lab03.repository.PostRepo;
import edu.miu.cs545.lab03.repository.UserRepo;
import edu.miu.cs545.lab03.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final ModelMapper modelMapper;
    private final UserRepo userRepo;
    private final CommentRepo commentRepo;
    private final PostRepo postRepo;

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
        Optional<Comment> comment = commentRepo.getCommentByUserIdPostIdCommentId(userId, postId, commentId);
        if (comment.isPresent()) {
            return modelMapper.map(comment.get(), CommentDto.class);
        }
        return null;
    }

    @Override
    public List<CommentDto> getComments(long userId, long postId) {
        return commentRepo.getCommentsByUserIdPostId(userId, postId).stream().map(c -> modelMapper.map(c, CommentDto.class)).toList();
    }

    @Override
    public void saveComment(long userId, long postId, CommentDto commentDto) {
        boolean exist = commentRepo.existsByUserIdAndPostId(userId, postId);
        if (exist) {
            Comment comment = modelMapper.map(commentDto, Comment.class);
            Optional<Post> post = postRepo.findById(postId);
            if (post.isPresent()) {
                comment.setPost(post.get());
                commentRepo.save(comment);
            }
        }
    }
}
