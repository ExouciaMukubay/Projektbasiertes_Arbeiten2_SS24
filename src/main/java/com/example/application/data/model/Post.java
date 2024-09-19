package com.example.application.data.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "posts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Post extends AbstractEntity {

    @Column(name = "creationDateTime")
    private LocalDateTime creationDateTime;

    @Column(name = "content")
    private String content;

    @Column(name = "imageUrl")
    private String imageUrl;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Column(name = "likes")
    private Set<Likes> likes = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User creator;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post")
    private Set<Comment> comments = new HashSet<>();
}
