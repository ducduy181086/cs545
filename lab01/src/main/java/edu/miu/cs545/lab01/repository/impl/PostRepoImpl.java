package edu.miu.cs545.lab01.repository.impl;

import edu.miu.cs545.lab01.entity.Post;
import edu.miu.cs545.lab01.repository.PostRepo;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class PostRepoImpl implements PostRepo {
    static List<Post> posts = new ArrayList<Post>();
    static {
        posts.add(new Post(1, "Introduction to Java", "Java is a high-level programming language...", "Alice"));
        posts.add(new Post(2, "Spring Boot Basics", "Spring Boot makes it easy to create stand-alone applications...", "Bob"));
        posts.add(new Post(3, "Understanding REST APIs", "REST APIs are essential for modern web development...", "Charlie"));
        posts.add(new Post(4, "Guide to Docker", "Docker is a tool designed to make it easier to create, deploy...", "Diana"));
        posts.add(new Post(5, "Microservices Architecture", "Microservices are a way to build applications as a suite of...", "Eve"));
    }

    @Override
    public List<Post> getAllPosts() {
        return posts;
    }

    @Override
    public Post getPostById(long id) {
        return posts.stream().filter(post -> post.getId() == id).findFirst().orElse(null);
    }

    @Override
    public List<Post> getPostsByAuthor(String value) {
        return posts.stream().filter(c -> c.getAuthor().contains(value)).collect(Collectors.toUnmodifiableList());
    }

    @Override
    public void save(Post post) {
        if (post.getId() == 0) {
            post.setId(posts.stream().map(Post::getId).max(Long::compareTo).orElse(0l) + 1);
            posts.add(post);
        }
        Post oldPost = posts.stream().filter(c -> c.getId() == post.getId()).findFirst().orElse(null);
        if (oldPost != null) {
            oldPost.setAuthor(post.getAuthor());
            oldPost.setContent(post.getContent());
            oldPost.setTitle(post.getTitle());
        }
    }

    public boolean delete(long id) {
        return posts.removeIf(post -> post.getId() == id);
    }
}
