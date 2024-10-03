package com.example.application.services;

import com.example.application.data.enums.Role;
import com.example.application.data.model.Friendship;
import com.example.application.data.model.Like;
import com.example.application.data.model.Post;
import com.example.application.data.model.User;
import com.example.application.data.model.dto.UserDto;
import com.example.application.data.repository.UserRepository;
import com.example.application.exceptions.UserNotFoundException;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Nullable;
import com.vaadin.hilla.crud.filter.Filter;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

/**
 *
 */
@AnonymousAllowed
@BrowserCallable
@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Get user optional by given id
     *
     * @param id
     * @return user or optional
     */
    public Optional<User> get(UUID id) {
        return Optional.ofNullable(userRepository.findUserById(id));
    }

    /**
     * Find user by id
     *
     * @param id
     * @return
     */
    public User findUser(UUID id) {
        var user = userRepository.findUserById(id);
        if (user == null) {
            log.error("User by given id not found in database");
            throw new UserNotFoundException("User by given id does not exists in database");
        } else {
            log.info("Find user by id succeed");
            return user;
        }
    }

    /**
     * Find user by username
     *
     * @param username
     * @return
     */
    public User findUser(String username) {
        var user = userRepository.findByUsername(username);
        if (user == null) {
            log.error("Username not found in database");
            throw new UsernameNotFoundException("Username does not exists in database");
        } else {
            log.info("Find username succeed");
            return user;
        }
    }

    /**
     * Search user by given query
     * @param query
     * @return List of Users
     */
    public List<User> searchUser(String query) {
        return userRepository.searchUser(query);
    }

    /**
     * Find all users
     * @return List of users
     */
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public List<@NonNull UserDto> list(Pageable pageable, @Nullable Filter filter) {
        Page<User> users = userRepository.findAll(pageable);
        return users.stream().map(UserDto::fromEntity).toList();
    }

    /**
     *
     * @param userDto
     * @return
     */
    public boolean checkIfUserAlreadyExists(UserDto userDto) {
        log.info("Check if user exists {} exists: {}", userDto.getUsername(),
                userRepository.existsByUsernameOrEmail(userDto.getUsername(), userDto.getEmail()));
        return userRepository.existsByUsernameOrEmail(userDto.getUsername(), userDto.getEmail());
    }

    /**
     * Adds new user
     *
     * @param userDto, UserDto
     */
    public void addUser(UserDto userDto) {
        var user = userRepository.findByUsername(userDto.getUsername());
        if (user != null) {
            log.warn("User already exists.");
        } else {
            User newUser = User.builder()
                    .username(userDto.getUsername())
                    .firstname(userDto.getFirstName())
                    .lastname(userDto.getLastName())
                    .email(userDto.getEmail())
                    .password(userDto.getPassword())
                    .roles(Set.of(Role.USER))
                    .isOnline(true).
                    biography("Hi, I am " + userDto.getFirstName() + "!").build();

            log.info("Save new user succeed: " + "["
                    + newUser.getUsername() + "] "
                    + newUser.getFirstname() + " "
                    + newUser.getLastname());

            userRepository.save(newUser);
        }
    }

    public User updateUser(UserDto userDto) {
        log.info("Find ID: " + userDto.getId());
        var user = userRepository.findUserById(userDto.getId());
        if (user == null) {
            log.error("User does not exist in database");
            throw new UserNotFoundException("User does not exists!");
        } else {
            log.info("User exists in database");

            if(!user.getUsername().equals(userDto.getUsername())) {
                user.setUsername(userDto.getUsername());
            }

            if(!user.getFirstname().equals(userDto.getFirstName())) {
                user.setFirstname(userDto.getFirstName());
            }

            if(!user.getLastname().equals(userDto.getLastName())) {
                user.setLastname(userDto.getLastName());
            }

            if(!user.getEmail().equals(userDto.getEmail())) {
                user.setEmail(userDto.getEmail());
            }

            if(!user.getBiography().equals(userDto.getBiography())) {
                user.setBiography(userDto.getBiography());
            }

            if(!user.getPassword().equals(userDto.getPassword())) {
                user.setPassword(userDto.getPassword());
            }

            log.info("Update user succeed!");
            return userRepository.save(user);
        }
    }

    /**
     * Deletes user
     *
     * @param user
     */
    public void deleteUser(User user) {
        log.info("Delete user succeed.");
        userRepository.delete(user);
    }

    public Set<Friendship> getAllFriendsFromUser(UUID userId){
        return userRepository.findUserById(userId).getFriends();
    }


    public int countFriendships(UUID userId){
        return userRepository.findUserById(userId).getFriends().size();
    }

    public List<Post> getLikedPostsFromUser(UUID userId){
        return userRepository.findUserById(userId).getLikedPosts().stream().map(Like::getPost).toList();
    }
}
