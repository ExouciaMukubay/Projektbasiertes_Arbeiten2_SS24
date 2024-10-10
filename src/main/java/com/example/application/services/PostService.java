package com.example.application.services;

import com.example.application.data.model.*;
import com.example.application.data.model.dto.PostDto;
import com.example.application.data.repository.PostRepository;
import com.example.application.data.repository.UserRepository;
import com.example.application.exceptions.PostException;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

/**
 * Provides methods to find, save, update and delete post
 */
@AnonymousAllowed
@AllArgsConstructor
@BrowserCallable
@Slf4j
@Service
public class PostService {

    private final PostRepository postRepository;

    private final UserRepository userRepository;

    /**
     * Find all posts from user
     *
     * @param userId
     * @return List<PostDto> list of posts from user
     */
    public List<PostDto> findAllPostsByGivenUserId(UUID userId) {
        var posts = postRepository.findAllByUserId(userId, Sort.by(Sort.Direction.DESC, "creationDateTime"));
        return posts.stream()
                .sorted(Comparator.comparing(Post::getCreationDateTime).reversed())
                .map(PostDto::fromEntity).toList();
    }

    /**
     * Find all posts from user and from his friends
     *
     * @param userId
     * @return List<PostDto> list of posts from user and friends, in case user has no friends only his posts
     */
    public List<PostDto> findAllPostsFromGivenUserAndFriends(UUID userId) {
        // in case when user does not have friends yet
        if (userRepository.findUserById(userId).getFriends().isEmpty()) {
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
        } else {
            return findAllPostsByGivenUserId(userId);
        }
    }


    /**
     * Create new post
     *
     * @param userId
     * @param postDto
     */
    public void createPost(UUID userId, PostDto postDto) {
        //TODO: Anpassen, falls bild eingefügt wird, dann geht es auch bild posten ohne content
        if (postDto.getContent().isBlank()) {
            log.error("Creating post failed. Post is blank!");
            throw new PostException("Post could not be created. Post has no content!");
        } else {
            var user = userRepository.findUserById(userId);

            Post createdPost = Post.builder()
                    .creationDateTime(LocalDateTime.now())
                    .content(postDto.getContent())
                    .imageUrl(postDto.getImageUrl())
                    .user(user)
                    .build();
            user.getCreatedPosts().add(createdPost);
            postRepository.save(createdPost);
            log.info("Creating new post succeed!");
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
        post.setImageUrl(postDto.getImageUrl());
        postRepository.save(post);
    }


    /**
     * Delete post
     *
     * @param postId
     */
    @Transactional
    public void deletePostById(UUID postId) {
        log.info("Delete post by postId {} succeed!", postId);
        postRepository.deletePostById(postId);
    }

    /**
     * Get liked posts from user
     *
     * @param userId
     * @return List<PostDto> list of liked posts
     */
    public List<PostDto> getLikedPostsFromUser(UUID userId) {
        return userRepository
                .findUserById(userId)
                .getLikedPosts()
                .stream().map(Like::getPost)
                .sorted(Comparator.comparing(Post::getCreationDateTime).reversed())
                .map(PostDto::fromEntity)
                .toList();
    }

    /**
     * Get saved posts from user
     *
     * @param userId
     * @return List<PostDto> list of saved posts
     */
    public List<PostDto> getSavedPostsFromUser(UUID userId) {
        return userRepository
                .findUserById(userId)
                .getSavedPosts()
                .stream().map(Save::getPost)
                .sorted(Comparator.comparing(Post::getCreationDateTime).reversed())
                .map(PostDto::fromEntity)
                .toList();
    }

        /*  public List<@NonNull PostDto> list(Pageable pageable, @Nullable Filter filter) {
        Page<Post> posts = postRepository.findAll(pageable);
        return posts.stream().map(PostDto::fromEntity).toList();
    }*/

}
