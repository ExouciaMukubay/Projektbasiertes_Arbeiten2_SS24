package com.example.application.data.repository;


import com.example.application.data.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    User findUserById(UUID uuid);
    User findByUsername(String username);

    boolean existsByUsernameOrEmail(String username, String email);
    User deleteUserById(UUID id);
    User deleteUserByUsername(String username);


}
