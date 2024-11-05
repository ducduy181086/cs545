package edu.miu.cs545.lab05.service;

import edu.miu.cs545.lab05.entity.dto.CommentDto;
import edu.miu.cs545.lab05.entity.dto.PostDto;
import edu.miu.cs545.lab05.entity.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAll();
    UserDto getById(long id);
    void save(UserDto userDto);
    List<PostDto> getAllPostByUserId(long userId);
    List<UserDto> getUsersHavePosts();
    List<UserDto> getUsersHavePosts(int numberOfPosts);
    List<UserDto> getUsersHaveTitlePosts(String title);
    CommentDto getCommentById(long userId, long postId, long commentId);
    List<CommentDto> getComments(long userId, long postId);
    void saveComment(long userId, long postId, CommentDto commentDto);
}
