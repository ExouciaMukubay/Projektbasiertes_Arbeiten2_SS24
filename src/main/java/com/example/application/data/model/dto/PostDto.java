package com.example.application.data.model.dto;

import com.example.application.data.model.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {

    private UUID id;
    private LocalDateTime creationDateTime;
    private String imageUrl;
    private String content;
    private UUID userId;

    public static PostDto fromEntity(Post post){
        return new PostDto(post.getId(), post.getCreationDateTime(), post.getImageUrl(),post.getContent(),
                post.getUser().getId());
    }
}
