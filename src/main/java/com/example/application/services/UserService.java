package com.example.application.services;

import com.example.application.data.model.User;
import com.example.application.data.repository.UserRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@AnonymousAllowed
@BrowserCallable
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> get(UUID id) {
        return Optional.ofNullable(userRepository.findUserById(id));
    }

    public User update(User entity) {
        return userRepository.save(entity);
    }

    public User save(User user){
        return userRepository.save(user);
    }
    public void delete(UUID id) {
        userRepository.deleteUserById(id);
    }

    public Page<User> list(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public Page<User> list(Pageable pageable, Specification<User> filter) {
        // return userRepository.findAll(filter, pageable);
        return null;
    }

    public int count() {
        return (int) userRepository.count();
    }

}
