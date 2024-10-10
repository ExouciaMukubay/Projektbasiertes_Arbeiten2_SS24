package com.example.application.services;


import com.example.application.data.keys.SaveKey;
import com.example.application.data.model.Save;
import com.example.application.data.model.dto.SaveDto;
import com.example.application.data.repository.PostRepository;
import com.example.application.data.repository.SaveRepository;
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
public class SaveService {

    private final PostRepository postRepository;

    private final UserRepository userRepository;

    private final SaveRepository saveRepository;


    public void savePost(UUID userId, UUID postId) {
        log.info("Save processing userId: {} postId: {}", userId, postId);
        var user = userRepository.findUserById(userId);
        var post = postRepository.findPostById(postId);

        var existingSave = saveRepository.findSaveByKey(buildKey(userId,postId));

        if(existingSave != null){
            log.info("Save already exists on post with id {}", postId);
            post.getSaves().remove(existingSave);
            user.getSavedPosts().remove(existingSave);
            saveRepository.delete(existingSave);
            log.info("Remove save from post with id {} succeed", postId);
        }else{
            log.info("Save does not exist on post with id {}. Proceeding to add.", postId);
            var save = Save.builder().key(buildKey(userId, postId)).user(user).post(post).build();
            saveRepository.save(save);
            post.getSaves().add(save);
            user.getSavedPosts().add(save);
            log.info("Save post with id {} succeed", postId);
        }
    }

    public List<SaveDto> getAllSavesFromPost(UUID postId){
        var saves = saveRepository.findSaveByKeyPostId(postId);
        return saves.stream().map(SaveDto :: fromEntity).toList();
    }


    private SaveKey buildKey(UUID userId, UUID postId){
        return SaveKey.builder().userId(userId).postId(postId).build();
    }

}
