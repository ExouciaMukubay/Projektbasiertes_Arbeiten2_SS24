package com.example.application.services;

import com.example.application.data.model.*;
import com.example.application.data.model.dto.PostDto;
import com.example.application.data.repository.PostRepository;
import com.example.application.data.repository.UserRepository;
import com.example.application.exceptions.EmptyPostException;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Nullable;
import com.vaadin.hilla.crud.filter.Filter;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@AnonymousAllowed
@AllArgsConstructor
@BrowserCallable
@Slf4j
@Service
public class PostService {

    private final PostRepository postRepository;

    private final UserRepository userRepository;

    public List<@NonNull PostDto> list(Pageable pageable, @Nullable Filter filter) {
        Page<Post> posts = postRepository.findAll(pageable);
        return posts.stream().map(PostDto::fromEntity).toList();
    }

    public List<PostDto> findAllPostsByGivenUserId(UUID userId) {
        var posts = postRepository.findAllByUserId(userId);
        return posts.stream().map(PostDto::fromEntity).toList();
    }

    public List<PostDto> findAllPostsFromGivenUserAndFriends(UUID userId) {
        var friendsUserIds =
                userRepository.findUserById(userId)
                        .getFriends()
                        .stream().map(Friendship::getFriend)
                        .map(User::getId)
                        .toList();


        var userAndFriendsIds = new ArrayList<UUID>();
        userAndFriendsIds.add(userId);
        userAndFriendsIds.addAll(friendsUserIds);

        // get posts and sort them in descending order
        var userAndFriendPosts = postRepository.findAllByUserIdIn(userAndFriendsIds, Sort.by(Sort.Direction.DESC, "creationDateTime"));

        return userAndFriendPosts
                .stream().sorted(Comparator.comparing(Post::getCreationDateTime).reversed())
                .map(PostDto::fromEntity)
                .toList();
    }


    /**
     * Add new post
     *
     * @param userId
     * @param postDto
     */
    public void createPost(UUID userId, PostDto postDto) {
        //TODO: Anpassen, falls bild eingefügt wird, dann geht es auch bild posten ohne content
        if (postDto.getContent().isBlank()) {
            log.error("Creating post failed. Post is blank!");
            throw new EmptyPostException("Post could not be created. Post has no content!");
        } else {
            var user = userRepository.findUserById(userId);
            Post newPost = Post.builder()
                    .creationDateTime(LocalDateTime.now())
                    .content(postDto.getContent())
                    .user(user)
                    .build();
            log.info("Creating new post succeed!");
            postRepository.save(newPost);
        }
    }

    /**
     * Update post
     *
     * @param postDto
     */
    public void updatePost(PostDto postDto) {
        var post = postRepository.findPostById(postDto.getId());
        post.setContent(postDto.getContent());
        postRepository.save(post);
    }

    public void deletePost(PostDto postDto) {
        postRepository.deletePostById(postDto.getId());
    }


    public List<Post> getLikedPostsFromUser(UUID userId){
        return userRepository
                .findUserById(userId)
                .getLikedPosts()
                .stream().map(Like :: getPost)
                .sorted(Comparator.comparing(Post :: getCreationDateTime).reversed())
                .toList();
    }

    public List<Post> getSavedPostsFromUser(UUID userId){
        return userRepository
                .findUserById(userId)
                .getSavedPosts()
                .stream().map(Save :: getPost)
                .sorted(Comparator.comparing(Post :: getCreationDateTime).reversed())
                .toList();
    }

    public int countLikesOfPost(UUID postId) {
        return postRepository.findPostById(postId).getLikes().size();
    }

    public int countSavingsFromPost(UUID postId) {
        return postRepository.findPostById(postId).getSaves().size();
    }
}
