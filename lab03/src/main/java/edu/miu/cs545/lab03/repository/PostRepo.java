package edu.miu.cs545.lab03.repository;

import edu.miu.cs545.lab03.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {
    List<Post> getPostByAuthorContains(String value);

    List<Post> getPostByTitle(String title);
}
