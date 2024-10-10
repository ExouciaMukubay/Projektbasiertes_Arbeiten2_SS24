package com.example.application.data.model.dto;

import com.example.application.data.model.Comment;
import com.example.application.data.model.User;
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
