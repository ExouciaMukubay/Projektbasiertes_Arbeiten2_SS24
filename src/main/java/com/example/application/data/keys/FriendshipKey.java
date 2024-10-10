package com.example.application.data.keys;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder(toBuilder = true)
@Embeddable
public class FriendshipKey implements Serializable {

    @Column(name = "userId")
    private UUID userId;

    @Column(name = "friendId")
    private UUID friendId;
}
