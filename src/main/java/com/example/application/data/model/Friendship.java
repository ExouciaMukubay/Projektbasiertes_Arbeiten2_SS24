package com.example.application.data.model;

import com.example.application.data.enums.FriendshipStatus;
import com.example.application.data.keys.FriendshipKey;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "friendship")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Friendship {

    @EmbeddedId
    private FriendshipKey key;

    @ManyToOne(optional = false)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(optional = false)
    @MapsId("friendId")
    @JoinColumn(name = "friend_id")
    private User friend;

    @Enumerated(EnumType.STRING)
    private FriendshipStatus friendshipStatus;

    private LocalDateTime createdAt;
}
