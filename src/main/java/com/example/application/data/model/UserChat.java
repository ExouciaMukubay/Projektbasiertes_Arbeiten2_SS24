package com.example.application.data.model;

import com.example.application.data.keys.UserChatKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//modelliert many to many beziehung zwischen user und chat
@Entity
@Table(name = "userChat")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserChat {

    @EmbeddedId
    private UserChatKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("chatId")
    @JoinColumn(name = "chat_id")
    private Chat chat;

    private String toUser;
}
