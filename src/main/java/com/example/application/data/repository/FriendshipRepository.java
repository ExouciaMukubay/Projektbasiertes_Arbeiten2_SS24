package com.example.application.data.repository;

import com.example.application.data.enums.FriendshipStatus;
import com.example.application.data.model.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FriendshipRepository extends JpaRepository<Friendship, UUID> {

    Friendship findFriendshipByUserIdAndFriendId(UUID userId, UUID friendId);

    List<Friendship> findAllByUserId(UUID user);

    boolean existsFriendshipByUserIdAndFriendId(UUID userId, UUID friendId);

    List<Friendship> findFriendshipsByUserIdAndFriendshipStatus(UUID userId, FriendshipStatus friendshipStatus);
}
