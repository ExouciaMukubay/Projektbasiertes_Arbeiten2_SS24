package com.example.application.data.model;

import com.example.application.data.keys.SaveKey;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "savedPosts")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Save {

    @EmbeddedId
    private SaveKey key;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("postId")
    @JoinColumn(name = "post_id")
    private Post post;
}
