package com.example.application.data.repository;

import com.example.application.data.model.Friendship;
import com.example.application.data.keys.FriendshipKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendshipRepository extends JpaRepository<Friendship, FriendshipKey> {
}
