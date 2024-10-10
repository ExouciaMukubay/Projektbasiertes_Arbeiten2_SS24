package com.example.application.data.model;

import com.example.application.data.keys.ChatOverviewChatsKey;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "chatoverviewchats")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatOverviewChats {

    @EmbeddedId
    private ChatOverviewChatsKey id;

    @ManyToOne
    @MapsId("chatOverviewId")
    @JsonIgnore
    @JoinColumn(name = "chat_overview_id")
    private ChatOverview chatOverview;

    @ManyToOne
    @MapsId("chatId")
    @JsonIgnore
    @JoinColumn(name = "chat_id")
    private Chat chat;
}
