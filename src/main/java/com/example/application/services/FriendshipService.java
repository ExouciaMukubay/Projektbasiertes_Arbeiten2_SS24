package com.example.application.services;

import com.example.application.data.enums.FriendshipStatus;
import com.example.application.data.keys.FriendshipKey;
import com.example.application.data.model.Friendship;
import com.example.application.data.repository.FriendshipRepository;
import com.example.application.data.repository.UserRepository;
import com.example.application.exceptions.FriendshipDoesNotExistException;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Manages friendships
 */
@AnonymousAllowed
@BrowserCallable
@Slf4j
@Service
public class FriendshipService {

    @Autowired
    private FriendshipRepository friendshipRepository;

    @Autowired
    private UserRepository userRepository;

    public Friendship sendFriendRequest(UUID userId, String friendUsername) {
        log.info("Sending friend request from user {} to friend user {}", userId, friendUsername);
        var user = userRepository.findUserById(userId);
        var friend = userRepository.findByUsername(friendUsername);
        var key = FriendshipKey.builder().userId(userId).friendId(friend.getId()).build();

        Friendship friendship = Friendship.builder()
                .key(key)
                .user(user)
                .friend(friend)
                .friendshipStatus(FriendshipStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();
        log.info("Save friend request from user {} to friend user {} succeed", userId, friendUsername);
        return friendshipRepository.save(friendship);
    }

    public Friendship acceptFriendRequest(UUID userId, String friendUsername) {
        log.info("Accept friend request from friend {} to current user {}", friendUsername, userId);

        var user = userRepository.findUserById(userId);
        var friend = userRepository.findByUsername(friendUsername);
        var key = FriendshipKey.builder().userId(userId).friendId(friend.getId()).build();

        var friendship = friendshipRepository.findFriendshipByKey(key);

        friendship.setFriendshipStatus(FriendshipStatus.ACCEPTED);
        user.getFriends().add(friendship);
        friend.getFriends().add(friendship);

        log.info("Save friendship from current user {} and friend {}", user.getUsername(), friend.getUsername());
        return friendshipRepository.save(friendship);
    }

    public Friendship rejectFriendRequest(UUID userId, String friendUsername) {
        log.info("Reject friend request from friend {} to current user {}", friendUsername, userId);

        var friend = userRepository.findByUsername(friendUsername);
        var key = FriendshipKey.builder().userId(userId).friendId(friend.getId()).build();
        var friendship = friendshipRepository.findFriendshipByKey(key);

        friendship.setFriendshipStatus(FriendshipStatus.REJECTED);

        return friendshipRepository.save(friendship);
    }


    public void removeFriend(UUID userId, String friendUsername) {
        log.info("Remove friendship between user {} and {}", userId, friendUsername);

        var user = userRepository.findUserById(userId);
        var friend = userRepository.findByUsername(friendUsername);
        var key = FriendshipKey.builder().userId(userId).friendId(friend.getId()).build();

        var friendship = friendshipRepository.findFriendshipByKey(key);

        user.getFriends().remove(friendship);
        friend.getFriends().remove(friendship);
        log.info("Deleting friendship suceed!");
        friendshipRepository.delete(friendship);
    }

    public Friendship findFriendship(UUID userId, String friendUsername) {
        log.info("Find friendship between current user {} and friend {}", userId, friendUsername);

        var friend = userRepository.findByUsername(friendUsername);
        var key = FriendshipKey.builder().userId(userId).friendId(friend.getId()).build();
        var friendship = friendshipRepository.findFriendshipByKey(key);
        if (friendship == null) {
            log.error("Friendship does not exist in database");
            throw new FriendshipDoesNotExistException("Friendship does not exist!");
        }

        return friendship;
    }

    public List<Friendship> getAllAcceptedFriendshipByUserId(UUID userId) {
        var user = userRepository.findUserById(userId);
        return friendshipRepository.findFriendshipsByUserAndFriendshipStatus(user, FriendshipStatus.ACCEPTED);
    }

    public List<Friendship> getAllPendingFriendshipBynUserId(UUID userId) {
        var user = userRepository.findUserById(userId);
        return friendshipRepository.findFriendshipsByUserAndFriendshipStatus(user, FriendshipStatus.PENDING);
    }


}
