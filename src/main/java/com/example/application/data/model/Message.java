package com.example.application.data.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "message")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "creationDateTime")
    private LocalDateTime creationDateTime;

    @Column(name = "text", nullable = false)
    private String text;

    @ManyToOne
    @JsonIgnore
    private User user;

    @OneToOne
    private User toUser;

    @ManyToOne
    @JsonIgnore
    private Chat chat;
}
