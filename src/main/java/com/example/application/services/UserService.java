package com.example.application.services;

import com.example.application.data.enums.Role;
import com.example.application.data.model.Friendship;
import com.example.application.data.model.Like;
import com.example.application.data.model.User;
import com.example.application.data.model.dto.PostDto;
import com.example.application.data.model.dto.UserDto;
import com.example.application.data.repository.UserRepository;
import com.example.application.exceptions.UserNotFoundException;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Nullable;
import com.vaadin.hilla.crud.filter.Filter;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Provides methods to find, add, update and delete user
 */
@AnonymousAllowed
@AllArgsConstructor
@BrowserCallable
@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;

    //TODO: friendshiprepo, messages, unc.co

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
     * @param userId
     * @return user or null if user not found
     */
    public UserDto findUserById(UUID userId) {
        log.info("Find user by userId: {} in progress!", userId);
        var user = userRepository.findUserById(userId);
        if (user == null) {
            log.error("User by given id not found in database!");
            throw new UserNotFoundException("User by given id does not exists in database!");
        } else {
            log.info("Find user by id succeed!");
            return UserDto.fromEntity(user);
        }
    }

    /**
     * Find user by username
     *
     * @param username
     * @return
     */
    public UserDto findUserByUsername(String username) {
        log.info("Find user by username: {} in progress!", username);
        var user = userRepository.findByUsername(username);
        if (user == null) {
            log.error("User by given id not found in database!");
            throw new UserNotFoundException("User by given username does not exists in database!");
        } else {
            log.info("Find user by given username succeed! {}", user.toString());
            return  UserDto.fromEntity(user);
        }
    }

    /**
     * Search user by given query
     * @param query
     * @return List of Users without itself
     */
    public List<UserDto> searchUser(String query) {
        log.info("Search user by given query: {} in progress!", query);
        var searchUsers = userRepository.searchUser(query);
        return searchUsers.stream()
                .map(UserDto :: fromEntity)
                .toList();
    }

    /**
     * Find all users
     * @return List of users
     */
    public List<UserDto> findAllUsers() {
        log.info("Find all user succeed!");
        return userRepository.findAll().stream().map(UserDto :: fromEntity).toList();
    }

    //TODO?
    public List<@NonNull UserDto> list(Pageable pageable, @Nullable Filter filter) {
        Page<User> users = userRepository.findAll(pageable);
        return users.stream().map(UserDto::fromEntity).toList();
    }

    /**
     * Check if user already exists by signing up
     * @param userDto
     * @return true if user exists in database or false if not
     */
    public boolean checkIfUserAlreadyExists(UserDto userDto) {
        log.info("Check if user {} exists: {}", userDto.getUsername(),
                userRepository.existsByUsernameOrEmail(userDto.getUsername(), userDto.getEmail()));
        return userRepository.existsByUsernameOrEmail(userDto.getUsername(), userDto.getEmail());
    }

    /**
     * Add new user
     * @param userDto, UserDto
     */
    public void addUser(UserDto userDto) {
        log.info("Add new user: {} in progress!", userDto.toString());
        var user = userRepository.findByUsername(userDto.getUsername());
        if (user != null) {
            log.warn("User already exists.");
        } else {
            log.info("User does not exist in database. Save user proceed.");
            User newUser = User.builder()
                    .username(userDto.getUsername())
                    .firstname(userDto.getFirstName())
                    .lastname(userDto.getLastName())
                    .email(userDto.getEmail())
                    .password(userDto.getPassword())
                    .roles(Set.of(Role.USER))
                    .isOnline(userDto.isOnline()).
                    biography("Hi, I am " + userDto.getFirstName() + "!").build();

            log.info("Save new user succeed!");
            userRepository.save(newUser);
        }
    }

    /**
     * Update user
     * @param userDto
     */
    public void updateUser(UserDto userDto) {
        log.info("Update user in progress!");
        var user = userRepository.findUserById(userDto.getId());
        if (user == null) {
            log.error("User does not exist in database");
            throw new UserNotFoundException("User does not exists! Update user fails.");
        } else {
            log.info("User exists in database");

            if(!user.getFirstname().equals(userDto.getFirstName())) {
                log.info("Firstname is changed!");
                user.setFirstname(userDto.getFirstName());
            }

            if(!user.getLastname().equals(userDto.getLastName())) {
                log.info("Lastname is changed!");
                user.setLastname(userDto.getLastName());
            }

            if(!user.getUsername().equals(userDto.getUsername())) {
                log.info("Username is changed!");
                user.setUsername(userDto.getUsername());
            }

            if(!user.getEmail().equals(userDto.getEmail())) {
                log.info("Email is changed!");
                user.setEmail(userDto.getEmail());
            }

            if(!user.getBiography().equals(userDto.getBiography())) {
                log.info("Biography is changed!");
                user.setBiography(userDto.getBiography());
            }

            if(!user.getPassword().equals(userDto.getPassword())) {
                log.info("Password is changed!");
                user.setPassword(userDto.getPassword());
            }

            log.info("Update user succeed!");
             userRepository.save(user);
        }
    }

    /**
     * Delete user
     * @param userDto
     */
    public void deleteUser(UserDto userDto) {
        log.info("Delete user succeed!");
        userRepository.delete(userRepository.findUserById(userDto.getId()));
    }

    //TODO: Friendship DTO?
    public Set<Friendship> getAllFriendsFromUser(UUID userId){
        log.info("Get all friends from user {} in progress!", userId);
        return userRepository.findUserById(userId).getFriends();
    }

    /**
     * Find all users that the current user is not friends with
     * @param userId
     * @return List<UserDto> list of users
     */
    public List<UserDto> findAllUnfriendedUsers(UUID userId){
        log.info("Find all unfriended users!");
        var users = userRepository.findAll();
        var loggedUserFriends = userRepository.findUserById(userId).getFriends().stream().map(Friendship::getUser).toList();
        return users.stream()
                .filter(user -> !user.getId().equals(userId))
                .filter(user -> !loggedUserFriends.contains(user))
                .sorted(Comparator.comparing(User :: getFirstname))
                .map(UserDto :: fromEntity)
                .toList();
    }

    /**
     * Get all posts that the user has liked
     * @param userId
     * @return List<PostDTo> list of liked posts
     */
    public List<PostDto> getLikedPostsFromUser(UUID userId){
        log.info("Get liked posts from user succeed!");
        return userRepository.findUserById(userId).getLikedPosts().stream().map(Like::getPost).map(PostDto :: fromEntity).toList();
    }

    /**
     * Set online status to offline when user is logged out
     * @param userId
     */
    public void setOnlineStatusOfflineWhenLogginOut(UUID userId){
        var user = userRepository.findUserById(userId);
        user.setOnline(false);
        log.info("Set status offline succeed!");
        userRepository.save(user);
    }
}
