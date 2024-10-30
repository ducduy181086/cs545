package edu.miu.cs545.lab01.repository;

import edu.miu.cs545.lab01.entity.Post;

import java.util.List;

public interface PostRepo {
    List<Post> getAllPosts();
    Post getPostById(long id);
    List<Post> getPostsByAuthor(String value);
    void save(Post post);
    boolean delete(long id);
}
