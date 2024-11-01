package edu.miu.cs545.lab03.repository;

import edu.miu.cs545.lab03.entity.Comment;
import edu.miu.cs545.lab03.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE SIZE(u.posts) > 1")
    List<User> findUsersWithMoreThanOnePost();

    @Query("SELECT u FROM User u WHERE SIZE(u.posts) > :numberOfPosts")
    List<User> findUsersWithMoreThanPosts(int numberOfPosts);

    @Query("SELECT u FROM User u INNER JOIN u.posts p WHERE p.title = :title")
    List<User> findUsersHaveTitlePosts(String title);
}
