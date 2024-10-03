package com.example.application.services;

import com.example.application.data.keys.LikeKey;
import com.example.application.data.model.Like;
import com.example.application.data.repository.LikesRepository;
import com.example.application.data.repository.PostRepository;
import com.example.application.data.repository.UserRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
        log.info("Like post with id {}", postId);

        var user = userRepository.findUserById(userId);
        var post = postRepository.findPostById(postId);
        var like = Like.builder().key(buildKey(userId, postId)).user(user).post(post).build();

        post.getLikes().add(like);
        user.getLikedPosts().add(like);
        likesRepository.save(like);
        userRepository.save(user);
        postRepository.save(post);
        log.info("Like post with id {} succeed", postId);

    }

    public void removeLikeFromPost(UUID userId, UUID postId) {
        log.info("Remove like from post with id {}", postId);

        var user = userRepository.findUserById(userId);
        var post = postRepository.findPostById(postId);

        var like = likesRepository.findLikeByKey(buildKey(userId, postId));
        post.getLikes().remove(like);
        user.getLikedPosts().remove(like);
        likesRepository.delete(like);
        userRepository.save(user);
        postRepository.save(post);
        log.info("Remove like from post with id {} succeed", postId);
    }

    private LikeKey buildKey(UUID userId, UUID postId){
        return LikeKey.builder().userId(userId).postId(postId).build();
    }
}
