package com.example.application.data.model.dto;

import com.example.application.data.model.Friendship;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FriendshipDto {

    private UUID id;
    private UserDto user;
    private UserDto friend;
    private String friendshipStatus;
    private LocalDateTime createdAt;
    private UUID initiatedByUserId;


    public static FriendshipDto fromEntity(Friendship friendship) {
        return new FriendshipDto(friendship.getId(), UserDto.fromEntity(friendship.getUser()),
                UserDto.fromEntity(friendship.getFriend()),
                friendship.getFriendshipStatus().toString(), friendship.getCreatedAt(), friendship.getInitiatedByUserId());
    }
}
