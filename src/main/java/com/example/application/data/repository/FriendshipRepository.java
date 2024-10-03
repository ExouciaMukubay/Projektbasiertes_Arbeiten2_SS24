package com.example.application.data.repository;

import com.example.application.data.enums.FriendshipStatus;
import com.example.application.data.keys.FriendshipKey;
import com.example.application.data.model.Friendship;
import com.example.application.data.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendshipRepository extends JpaRepository<Friendship, FriendshipKey> {

    Friendship findFriendshipByKey(FriendshipKey key);

    List<Friendship> findFriendshipsByUserAndFriendshipStatus(User user, FriendshipStatus friendshipStatus);
}
