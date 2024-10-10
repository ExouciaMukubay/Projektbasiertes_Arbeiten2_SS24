package com.example.application.data.repository;

import com.example.application.data.model.Post;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {

    List<Post> findAllByUserId(UUID userId, Sort sort);

    List<Post> findAllByUserIdIn(List<UUID> userIds, Sort sort);

    Post findPostById(UUID id);

    void deletePostById(UUID id);

}
