package com.example.application.data.model;


import com.example.application.data.keys.LikeKey;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

/**
 * Manages relationship between post and user by liking a post
 */
@Entity
@Table(name = "likedPosts")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Like {

    @EmbeddedId
    private LikeKey key;

    @ManyToOne
    @MapsId("userId")
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("postId")
    @JsonIgnore
    @JoinColumn(name = "post_id")
    private Post post;
}
