package com.example.application.services;

import com.example.application.data.keys.LikeKey;
import com.example.application.data.model.Like;
import com.example.application.data.model.dto.LikeDto;
import com.example.application.data.repository.LikesRepository;
import com.example.application.data.repository.PostRepository;
import com.example.application.data.repository.UserRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@AnonymousAllowed
@BrowserCallable
@AllArgsConstructor
@Slf4j
@Service
public class LikeService {

    private final PostRepository postRepository;

    private final UserRepository userRepository;

    private final LikesRepository likesRepository;

    public void likePost(UUID userId, UUID postId) {
        log.info("Like post processing under userId: {} and postId: {}", userId, postId);
        var user = userRepository.findUserById(userId);
        var post = postRepository.findPostById(postId);
        var existingLike = likesRepository.findLikeByKey(buildKey(userId, postId));

        if (existingLike != null) {
            log.info("Like already exists on post with id {}", postId);
            post.getLikes().remove(existingLike);
            user.getLikedPosts().remove(existingLike);
            likesRepository.delete(existingLike);
            log.info("Remove like from post with id {} succeed", postId);

        } else {
            log.info("Like does not exist on post with id {}. Proceeding to add.", postId);
            var like = Like.builder().key(buildKey(userId, postId)).user(user).post(post).build();
            likesRepository.save(like);
            post.getLikes().add(like);
            user.getLikedPosts().add(like);
            log.info("Like post with id {} succeed", postId);
        }
    }

    public List<LikeDto> getAllLikesFromPost(UUID postId){
        var likes = likesRepository.findLikeByKeyPostId(postId);
        return likes.stream().map(LikeDto :: fromEntity).toList();
    }

    private LikeKey buildKey(UUID userId, UUID postId){
        return LikeKey.builder().userId(userId).postId(postId).build();
    }
}
