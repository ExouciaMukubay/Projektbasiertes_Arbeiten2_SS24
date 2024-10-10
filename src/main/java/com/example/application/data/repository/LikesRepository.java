package com.example.application.data.repository;

import com.example.application.data.keys.LikeKey;
import com.example.application.data.model.Like;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface LikesRepository extends CrudRepository<Like, LikeKey> {
    Like findLikeByKey(LikeKey key);
    List<Like> findLikeByKeyPostId(UUID postId);
}
