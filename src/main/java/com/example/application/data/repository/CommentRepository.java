package com.example.application.data.repository;

import com.example.application.data.model.Comment;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentRepository extends CrudRepository<Comment, UUID> {

    Comment findCommentById(UUID commentId);

    List<Comment> findAllByIdIn(List<UUID> commentIds);


    void deleteCommentById(UUID commentId);

    List<Comment> findAllByPostId(UUID postId, Sort sort);

}
