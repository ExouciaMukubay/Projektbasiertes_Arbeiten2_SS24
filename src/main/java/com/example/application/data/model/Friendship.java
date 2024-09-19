package com.example.application.data.model;

import com.example.application.data.enums.FriendshipStatus;
import com.example.application.data.keys.FriendshipKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "friendship")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Friendship {

    @EmbeddedId
    private FriendshipKey id;

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
}
