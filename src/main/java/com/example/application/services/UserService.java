package com.example.application.services;

import com.example.application.data.enums.Role;
import com.example.application.data.model.User;
import com.example.application.data.model.dto.UserDto;
import com.example.application.data.repository.UserRepository;
import com.example.application.exceptions.UserNotFoundException;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@AnonymousAllowed
@BrowserCallable
@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> get(UUID id) {
        return Optional.ofNullable(userRepository.findUserById(id));
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public boolean checkIfUserAlreadyExists(UserDto userDto){
        log.info("Check if user with {} {} exists: {}", userDto.getUsername(), userDto.getEmail(),
                userRepository.existsByUsernameOrEmail(userDto.getUsername(), userDto.getEmail()));
        return userRepository.existsByUsernameOrEmail(userDto.getUsername(), userDto.getEmail());
    }

    public User updateUser(UserDto userDto) {
        var user = userRepository.findByUsername(userDto.getUsername());
        if (user == null) {
            log.error("User does not exist in database");
            throw new UserNotFoundException("User does not exists!");
        } else {
            user.setUsername(userDto.getUsername());
            user.setFirstname(user.getFirstname());
            user.setLastname(user.getLastname());
            user.setEmail(userDto.getEmail());
            user.setPassword(userDto.getPassword());
            log.info("Update user succeed!");
            return userRepository.save(user);
        }
    }

    /**
     * Find user by username
     *
     * @param username
     * @return
     */
    public User findUserByUsername(String username) {
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

    /**
     * Deletes user or throws an exception if user does not exist
     *
     * @param id
     */
    public void deleteUser(UUID id) {
        var user = userRepository.findUserById(id);
        if (user == null) {
            log.error("User does not exists in the database");
            throw new UserNotFoundException("User does not exists!");
        } else {
            log.info("Delete user succeed.");
            userRepository.delete(user);
        }
    }

    public Page<User> list(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public Page<User> list(Pageable pageable, Specification<User> filter) {
        // return userRepository.findAll(filter, pageable);
        return null;
    }

}
