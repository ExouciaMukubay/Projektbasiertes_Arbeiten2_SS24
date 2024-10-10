package com.example.application.services;

import com.example.application.data.model.Comment;
import com.example.application.data.model.dto.CommentDto;
import com.example.application.data.repository.CommentRepository;
import com.example.application.data.repository.PostRepository;
import com.example.application.data.repository.UserRepository;
import com.example.application.exceptions.CommentException;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@AnonymousAllowed
@BrowserCallable
@AllArgsConstructor
@Slf4j
@Service
public class CommentService {

    private CommentRepository commentRepository;
    private UserRepository userRepository;
    private PostRepository postRepository;


    public void createComment(UUID userId, UUID postId, CommentDto commentDto){
        if(commentDto.getText().isBlank()){
            log.error("Creating comment failed. Post is blank!");
            throw new CommentException("Post could not be created. Post has no content!");
        }else{
            var user = userRepository.findUserById(userId);
            var post = postRepository.findPostById(postId);
            Comment createdComment = Comment.builder()
                    .text(commentDto.getText())
                    .creationDateTime(LocalDateTime.now())
                    .user(user)
                    .post(post)
                    .build();
            user.getComments().add(createdComment);
            post.getComments().add(createdComment);
            commentRepository.save(createdComment);
            log.info("Creating new comment succeed!");
        }
    }

    /**
     * Update comment
     * @param commentDto
     * @return updated comment or non updated comment
     */
    public CommentDto updateComment(CommentDto commentDto){
        log.info("Update comment `{}` in progress!", commentDto.getText());
        var comment = commentRepository.findCommentById(commentDto.getId());

        if(comment.getText().equals(commentDto.getText())){
          log.info("Text was not changed. Update comment cancelled!");
          return commentDto;
        }else{
            log.info("Text was changed. Update text in comment!");
            comment.setText(commentDto.getText());
            log.info("Update comment succeed!");
            commentRepository.save(comment);
            return CommentDto.fromEntity(comment);
        }
    }


    /**
     * Delet comment from user
     * @param userId userId
     * @param commentDto commentDto
     */
    //explicit transaction needed for delete operation
    @Transactional
    public void deleteComment(UUID userId, CommentDto commentDto) {
        log.info("Delete comment {} by user {} in progress", commentDto.getText(), userId);
        if(!commentDto.getUser().getId().equals(userId)){
            log.info("User cannot delete a comment which was not created by themselves.");
            throw new CommentException("Delete comment failed. Comment was not created by user!");
        }else {
            commentRepository.deleteCommentById(commentDto.getId());
        }
    }

    public List<CommentDto> findAllCommentsByGivenPost(UUID postId){
        var comments = commentRepository.findAllByPostId(postId, Sort.by(Sort.Direction.DESC, "creationDateTime"));

        return comments
                .stream().sorted(Comparator.comparing(Comment :: getCreationDateTime).reversed())
                .map(CommentDto :: fromEntity)
                .toList();
    }
}
