package com.example.application.data.model;

import com.example.application.data.keys.ChatOverviewChatsKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "chatOverviewChats")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatOverviewChats {

    @EmbeddedId
    private ChatOverviewChatsKey id;

    @ManyToOne
    @MapsId("chatOverviewId")
    @JoinColumn(name = "chat_overview_id")
    private ChatOverview chatOverview;

    @ManyToOne
    @MapsId("chatId")
    @JoinColumn(name = "chat_id")
    private Chat chat;
}
