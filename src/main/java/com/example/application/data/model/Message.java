package com.example.application.data.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "message")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Message extends AbstractEntity {

    @Column(name = "creationDateTime")
    private LocalDateTime creationDateTime;

    @Column(name = "text", nullable = false)
    private String text;

    @ManyToOne
    private User fromUser;

    @OneToOne
    private User toUser;

    @ManyToOne
    private Chat chat;
}
