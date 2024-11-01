package edu.miu.cs545.lab03.repository;

import edu.miu.cs545.lab03.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c INNER JOIN c.post p INNER JOIN p.user u WHERE u.id = :userId AND p.id = :postId AND c.id = :commentId")
    Optional<Comment> getCommentByUserIdPostIdCommentId(long userId, long postId, long commentId);
}
