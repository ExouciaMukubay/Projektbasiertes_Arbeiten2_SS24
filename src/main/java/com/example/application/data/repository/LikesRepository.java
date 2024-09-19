package com.example.application.data.repository;

import com.example.application.data.model.Likes;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface LikesRepository extends CrudRepository<Likes, UUID> {
}
