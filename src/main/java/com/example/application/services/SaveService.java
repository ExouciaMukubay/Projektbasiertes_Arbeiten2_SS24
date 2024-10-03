package com.example.application.services;


import com.example.application.data.keys.SaveKey;
import com.example.application.data.model.Save;
import com.example.application.data.repository.PostRepository;
import com.example.application.data.repository.SaveRepository;
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
public class SaveService {

    private final PostRepository postRepository;

    private final UserRepository userRepository;

    private final SaveRepository saveRepository;


    public void savePost(UUID userId, UUID postId) {
        log.info("Save post with id {}", postId);
        var user = userRepository.findUserById(userId);
        var post = postRepository.findPostById(postId);
        var save = Save.builder().key(buildKey(userId, postId)).user(user).post(post).build();

        post.getSaves().add(save);
        user.getSavedPosts().add(save);
        saveRepository.save(save);
        userRepository.save(user);
        postRepository.save(post);

        log.info("Save post with id {} succeed", postId);
    }


    public void removeSaveFromPost(UUID userId, UUID postId) {
        log.info("Remove save post with id {}", postId);
        var user = userRepository.findUserById(userId);
        var post = postRepository.findPostById(postId);
        var save = saveRepository.findSaveByKey(buildKey(userId, postId));

        post.getSaves().remove(save);
        user.getSavedPosts().remove(save);
        saveRepository.delete(save);
        userRepository.save(user);
        postRepository.save(post);
        log.info("Remove save post with id {} succeed", postId);

    }


    private SaveKey buildKey(UUID userId, UUID postId){
        return SaveKey.builder().userId(userId).postId(postId).build();
    }

}
