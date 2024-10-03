package com.example.application.data.model;


import com.example.application.data.keys.LikeKey;
import jakarta.persistence.*;
import lombok.*;

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
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("postId")
    @JoinColumn(name = "post_id")
    private Post post;
}
