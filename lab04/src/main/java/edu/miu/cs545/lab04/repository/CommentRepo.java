package edu.miu.cs545.lab04.repository;

import edu.miu.cs545.lab04.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c INNER JOIN c.post p INNER JOIN p.user u WHERE u.id = :userId AND p.id = :postId AND c.id = :commentId")
    Optional<Comment> getCommentByUserIdPostIdCommentId(long userId, long postId, long commentId);

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Post p WHERE p.id = :postId AND p.user.id = :userId")
    boolean existsByUserIdAndPostId(long userId, long postId);

    @Query("SELECT p.comments FROM Post p WHERE p.id = :postId AND p.user.id = :userId")
    List<Comment> getCommentsByUserIdPostId(long userId, long postId);
}
