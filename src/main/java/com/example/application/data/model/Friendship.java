package com.example.application.data.model;

import com.example.application.data.enums.FriendshipStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "friendship")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Friendship {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(optional = false)
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(optional = false)
    @JsonIgnore
    @JoinColumn(name = "friend_id")
    private User friend;

    @Enumerated(EnumType.STRING)
    private FriendshipStatus friendshipStatus;

    private LocalDateTime createdAt;

    // Flag to distinguish if user was the sender or not
    private UUID initiatedByUserId;
}
