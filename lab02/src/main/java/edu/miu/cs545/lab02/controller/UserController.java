package edu.miu.cs545.lab02.controller;

import edu.miu.cs545.lab02.entity.dto.PostDto;
import edu.miu.cs545.lab02.entity.dto.UserDto;
import edu.miu.cs545.lab02.service.UserService;
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
    public ResponseEntity<List<UserDto>> get(@RequestParam(name = "exist-posts", required = false) boolean existPosts) {
        List<UserDto> users;
        if (existPosts) {
            users = userService.getUsersHavePosts();
        }
        else {
            users = userService.getAll();
        }
        return ResponseEntity.ok(users);
    }

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
}
