package edu.miu.cs545.lab01.controller;

import edu.miu.cs545.lab01.entity.dto.PostDto;
import edu.miu.cs545.lab01.helper.FilterParser;
import edu.miu.cs545.lab01.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @GetMapping
    public ResponseEntity<List<PostDto>> get(@RequestParam(required = false) String filter) {
        var filters = FilterParser.parseFilter(filter);
        List<PostDto> posts;
        if (filters.containsKey("author")) {
            posts = postService.getByAuthor(filters.get("author"));
        }
        else {
            posts = postService.getAll();
        }
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> get(@PathVariable long id) {
        var post = postService.getById(id);
        return ResponseEntity.ok(post);
    }

    @PostMapping
    public void create(@RequestBody PostDto post) {
        postService.save(post);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        var deleted = postService.delete(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable long id, @RequestBody PostDto post) {
        post.setId(id);
        var postOld = postService.getById(id);
        if (postOld != null) {
            postService.save(post);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
