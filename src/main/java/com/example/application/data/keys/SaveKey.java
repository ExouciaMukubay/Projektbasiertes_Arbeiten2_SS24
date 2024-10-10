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
@Builder
@EqualsAndHashCode
@Embeddable
public class SaveKey implements Serializable {

    @Column(name = "userId")
    private UUID userId;

    @Column(name = "postId")
    private UUID postId;
}
