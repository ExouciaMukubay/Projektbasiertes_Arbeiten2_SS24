package com.example.application.data.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "posts")
@Getter
@Builder()
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "creationdatetime")
    private LocalDateTime creationDateTime;

    @Column(name = "content")
    private String content;

    @Column(name = "imageurl")
    private String imageUrl;

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Column(name = "likes")
    private Set<Like> likes = new HashSet<>();

    @OneToMany(mappedBy = "post",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Column(name = "saves")
    private Set<Save> saves = new HashSet<>();

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userid")
    private User user;

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Comment> comments = new HashSet<>();
}
