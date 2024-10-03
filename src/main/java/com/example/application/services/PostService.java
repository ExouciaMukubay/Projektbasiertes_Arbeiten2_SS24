package com.example.application.services;

import com.example.application.data.model.Post;
import com.example.application.data.model.dto.PostDto;
import com.example.application.data.model.dto.UserDto;
import com.example.application.data.repository.PostRepository;
import com.example.application.data.repository.UserRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Nullable;
import com.vaadin.hilla.crud.filter.Filter;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@AnonymousAllowed
@BrowserCallable
@Slf4j
@Service
public class PostService {

    private final PostRepository postRepository;

    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }


    public List<@NonNull PostDto> list(Pageable pageable, @Nullable Filter filter) {
        Page<Post> posts = postRepository.findAll(pageable);
        return posts.stream().map(PostDto :: fromEntity).toList();
    }
    public List<PostDto> findAllPostsByGivenUser(UserDto userDto) {
        var posts = postRepository.findAllByUser(userRepository.findUserById(userDto.getId()));
        return posts.stream().map(PostDto :: fromEntity).toList();
    }

    /**
     * Add new post
     * @param userDto
     * @param postDto
     */
    public void addPost(UserDto userDto, PostDto postDto) {
        Post newPost = Post.builder()
                .creationDateTime(postDto.getCreationDateTime())
                .content(postDto.getContent())
                .user(userRepository.findUserById(userDto.getId()))
                .build();
        postRepository.save(newPost);
    }

    /**
     * Update post
     * @param postDto
     */
    public void updatePost(PostDto postDto) {
        var post = postRepository.findPostById(postDto.getUserId());
        post.setContent(postDto.getContent());
        postRepository.save(post);
    }

    public void deletePost(PostDto postDto) {
        postRepository.deletePostById(postDto.getId());
    }
}
