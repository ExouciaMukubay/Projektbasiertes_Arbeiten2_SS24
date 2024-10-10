package com.example.application.services;

import com.example.application.data.model.User;
import com.example.application.data.security.AuthenticatedUser;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

/**
 * AuthenticatedUserService gets authenticated user
 */
@Endpoint
@AnonymousAllowed
public class AuthenticatedUserService {

    @Autowired
    private AuthenticatedUser authenticatedUser;

    public Optional<User> getAuthenticatedUser() {
        return authenticatedUser.get();
    }
}
