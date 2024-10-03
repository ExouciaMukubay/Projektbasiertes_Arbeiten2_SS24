package com.example.application.data.repository;


import com.example.application.data.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    User findUserById(UUID uuid);
    User findByUsername(String username);

    boolean existsByUsernameOrEmail(String username, String email);
    User deleteUserById(UUID id);
    User deleteUserByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.firstname LIKE %:query% OR u.lastname LIKE %:query% OR u.username LIKE " +
            "%:query% OR u.email LIKE %:query%")
    List<User> searchUser(@Param("query") String query);

}
