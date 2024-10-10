package com.example.application.data.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "comments")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "text")
    private String text;

    @Column(name = "creationdatetime")
    private LocalDateTime creationDateTime;

    @ManyToOne(optional = false)
    @JsonIgnore
    @JoinColumn(name = "userid")
    private User user;

    @ManyToOne(optional = false)
    @JsonIgnore
    @JoinColumn(name = "postid")
    private Post post;
}
