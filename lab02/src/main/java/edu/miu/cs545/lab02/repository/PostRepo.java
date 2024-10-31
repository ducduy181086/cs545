package edu.miu.cs545.lab02.repository;

import edu.miu.cs545.lab02.entity.Post;
import edu.miu.cs545.lab02.entity.dto.PostDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {
    List<Post> getPostByAuthorContains(String value);
}
