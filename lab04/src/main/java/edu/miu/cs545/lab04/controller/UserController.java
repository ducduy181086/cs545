package edu.miu.cs545.lab04.controller;

import edu.miu.cs545.lab04.aspect.annotation.ExecutionTime;
import edu.miu.cs545.lab04.entity.dto.CommentDto;
import edu.miu.cs545.lab04.entity.dto.PostDto;
import edu.miu.cs545.lab04.entity.dto.UserDto;
import edu.miu.cs545.lab04.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> get(
        @RequestParam(name = "exist-posts", required = false) boolean existPosts,
        @RequestParam(name = "number-of-posts", defaultValue = "-1", required = false) int numberOfPosts,
        @RequestParam(name = "posts-title", defaultValue = "", required = false) String title) {
        List<UserDto> users;
        if (existPosts) {
            users = userService.getUsersHavePosts();
        } else if (title != null && !title.equals("")) {
            users = userService.getUsersHaveTitlePosts(title);
        } else {
            if (numberOfPosts == -1) users = userService.getAll();
            else users = userService.getUsersHavePosts(numberOfPosts);
        }
        return ResponseEntity.ok(users);
    }

    @ExecutionTime
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> get(@PathVariable long id) {
        var user = userService.getById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public void create(@RequestBody UserDto user) {
        userService.save(user);
    }

    @GetMapping("/{id}/posts")
    public ResponseEntity<List<PostDto>> getPosts(@PathVariable long id) {
        var posts = userService.getAllPostByUserId(id);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{id}/posts/{postId}/comments/{commentId}")
    public ResponseEntity<CommentDto> getComment(@PathVariable long id, @PathVariable long postId, @PathVariable long commentId) {
        var comment = userService.getCommentById(id, postId, commentId);
        return ResponseEntity.ok(comment);
    }

    @GetMapping("/{id}/posts/{postId}/comments")
    public ResponseEntity<List<CommentDto>> getComments(@PathVariable long id, @PathVariable long postId) {
        var comments = userService.getComments(id, postId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/{id}/posts/{postId}/comments")
    public void createComment(@PathVariable long id, @PathVariable long postId, @RequestBody CommentDto comment) {
        userService.saveComment(id, postId, comment);
    }

    @GetMapping("/exception")
    public void createException() throws Exception {
        throw new Exception("Exception test.");
    }
}
