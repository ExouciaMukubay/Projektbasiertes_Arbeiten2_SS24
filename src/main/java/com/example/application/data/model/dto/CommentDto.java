package com.example.application.data.model.dto;

import com.example.application.data.model.Comment;
import com.example.application.data.model.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {

    private UUID id;
    private LocalDateTime creationDateTime;
    private String text;
    private User user;
    private UUID postId;

    public static CommentDto fromEntity(Comment comment){
        return new CommentDto(comment.getId(), comment.getCreationDateTime(), comment.getText(),
                comment.getUser(), comment.getPost().getId());
    }
}
