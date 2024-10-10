package com.example.application.data.keys;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
@Builder(toBuilder = true)
@Embeddable
public class ChatOverviewChatsKey implements Serializable {

    @Column(name = "chatOverviewId")
    private UUID chatOverviewId;

    @Column(name = "chatId")
    private UUID chatId;
}
