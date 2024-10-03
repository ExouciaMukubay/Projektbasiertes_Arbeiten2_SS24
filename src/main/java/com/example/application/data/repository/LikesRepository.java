package com.example.application.data.repository;

import com.example.application.data.keys.LikeKey;
import com.example.application.data.model.Like;
import org.springframework.data.repository.CrudRepository;

public interface LikesRepository extends CrudRepository<Like, LikeKey> {

    Like findLikeByKey(LikeKey key);

}
