package com.example.application.services;

import com.example.application.data.enums.FriendshipStatus;
import com.example.application.data.model.Friendship;
import com.example.application.data.model.dto.FriendshipDto;
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
 *
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

    /**
     * Send friend request to user
     *
     * @param userId   the sender
     * @param friendId the receiver
     * @return
     */
    public void sendFriendRequest(UUID userId, UUID friendId) {
        log.info("Sending friend request from user {} to friend user {} in progress!", userId, friendId);
        log.info("Check if friendship does already exist from initiator side or receiver side!");
        if (checkIfOneSidedFriendshipRequestExist(userId, friendId)) {
            log.error("Friendship does already exist! Sending a new friendship request is not needed!");
        } else {
            log.info("Friendship does not exist! Save new friend request in progress!");
            var user = userRepository.findUserById(userId);
            var friend = userRepository.findUserById(friendId);

            Friendship friendship = Friendship.builder()
                    .user(user)
                    .friend(friend)
                    .friendshipStatus(FriendshipStatus.PENDING)
                    .createdAt(LocalDateTime.now())
                    .initiatedByUserId(userId)
                    .build();
            log.info("Save friend request from user {} to friend user {} succeed. Status: {}", userId, friendId,
                    friendship.getFriendshipStatus().toString());
            friendshipRepository.save(friendship);
        }
    }


      public void acceptFriendRequest(UUID userId, UUID friendId) {
          log.info("Accept friend request from friend {} to current user {} in progress!", friendId, userId);

          var user = userRepository.findUserById(userId);
          var friend = userRepository.findUserById(friendId);
          var friendship = findOneSideFriendshipFromUsersBidirectionalRelationship(userId, friendId);

          friendship.setFriendshipStatus(FriendshipStatus.ACCEPTED);
          user.getFriends().add(friendship);
          friend.getFriends().add(friendship);

          log.info("Save friendship from current user {} and friend {}", userId, friendId);
          friendshipRepository.save(friendship);
      }



      public void declineFriendshipRequest(UUID userId, UUID friendId) {
          log.info("Reject friend request from friend {} to current user {}", friendId, userId);
          var friendship = findOneSideFriendshipFromUsersBidirectionalRelationship(userId, friendId);

          friendship.setFriendshipStatus(FriendshipStatus.REJECTED);
          friendshipRepository.save(friendship);
      }

    public FriendshipDto findFriendship(UUID userId, UUID friendId) {
        log.info("Find friendship between current user {} and friend {}", userId, friendId);
        var friendship = findOneSideFriendshipFromUsersBidirectionalRelationship(userId, friendId);
        if (friendship == null) {
            log.error("Friendship does not exist in database");
            throw new FriendshipDoesNotExistException("Friendship does not exist!");
        }

        log.info("Friendship was found");
        return FriendshipDto.fromEntity(friendship);
    }

    public List<FriendshipDto> getAllAcceptedFriendshipByUserId(UUID userId) {
        return friendshipRepository.findFriendshipsByUserIdAndFriendshipStatus(userId, FriendshipStatus.ACCEPTED).stream().map(FriendshipDto::fromEntity).toList();
    }

    public List<FriendshipDto> getAllPendingFriendshipByUserId(UUID userId) {
        var user = userRepository.findUserById(userId);
        return friendshipRepository.findFriendshipsByUserIdAndFriendshipStatus(userId, FriendshipStatus.PENDING).stream().map(FriendshipDto::fromEntity).toList();
    }

    /**
     *
     * @param userId
     * @param friendId
     * @return
     */
    public boolean checkIfFriendshipIsPending(UUID userId, UUID friendId) {
        log.info("Check if friendship is pending between user {} and friend {} in progress!", userId, friendId);
        if (!checkIfOneSidedFriendshipRequestExist(userId, friendId)) {
            log.info("Friendship does not exist! Return false!");
            return false;
        } else {
            log.info("Friendship between user {} and friend {} does exist!", userId, friendId);
            var friendship = findOneSideFriendshipFromUsersBidirectionalRelationship(userId, friendId);
            return friendship.getFriendshipStatus().equals(FriendshipStatus.PENDING);
        }
    }


    /**
     *
     * @param userId
     * @param friendId
     * @return
     */
    private boolean checkIfOneSidedFriendshipRequestExist(UUID userId, UUID friendId) {
        var friendship1 = friendshipRepository.findFriendshipByUserIdAndFriendId(userId, friendId);
        var friendship2 = friendshipRepository.findFriendshipByUserIdAndFriendId(friendId, userId);

        return friendship1 != null && friendship2 == null || friendship1 == null && friendship2 != null;
    }

    /**
     * Find only one of both friendship
     * Because the friendship request from Max Mustermann to Benjamin Brown and the friendship request from Benjamin
     * Brown and Max Mustermann will be saved differently
     *
     * @param currentUserId
     * @param friendId
     * @return
     */
    private Friendship findOneSideFriendshipFromUsersBidirectionalRelationship(UUID currentUserId,
                                                                               UUID friendId) {
        var friendshipLeftSide = friendshipRepository.findFriendshipByUserIdAndFriendId(currentUserId, friendId);

        if (friendshipLeftSide == null) {
            //in this case we switch the ID
            // currentUserId = friendId
            // friendId = currentUserId
            return friendshipRepository.findFriendshipByUserIdAndFriendId(friendId, currentUserId);
        } else {
            return friendshipLeftSide;
        }
    }

    /**
     *
     * @param userId
     * @param friendId
     * @return
     */
    public boolean checkIfCurrentUserInitiatedFriendRequest(UUID userId, UUID friendId) {
        var friendship = findOneSideFriendshipFromUsersBidirectionalRelationship(userId, friendId);
        return friendship.getInitiatedByUserId().equals(userId);
    }

    public List<FriendshipDto> getFriendshipsFromUser ( UUID userId){
        return friendshipRepository.findAllByUserId(userId).stream().map(FriendshipDto :: fromEntity).toList();
    }
}

