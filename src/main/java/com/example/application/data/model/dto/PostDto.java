package com.example.application.data.model.dto;

import com.example.application.data.model.Post;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {

    private UUID id;
    private LocalDateTime creationDateTime;
    private String imageUrl;
    private String content;
    private UserDto user;
    private Set<CommentDto> comments;
    private Set<LikeDto> likes;
    private Set<SaveDto> saves;

    public static PostDto fromEntity(Post post) {
        return new PostDto(post.getId(), post.getCreationDateTime(), post.getImageUrl(), post.getContent(),
                UserDto.fromEntity(post.getUser()),
                post.getComments().stream()
                        .map(CommentDto::fromEntity)
                        .collect(Collectors.toSet()),
                post.getLikes().stream()
                        .map(LikeDto::fromEntity)
                        .collect(Collectors.toSet()),
                post.getSaves().stream()
                        .map(SaveDto::fromEntity)
                        .collect(Collectors.toSet())
        );
    }
}
