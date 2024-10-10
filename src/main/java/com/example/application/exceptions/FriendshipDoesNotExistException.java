package com.example.application.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class FriendshipDoesNotExistException extends RuntimeException{
    public FriendshipDoesNotExistException(String message) {
        super(message);
    }

    public FriendshipDoesNotExistException(String message, Throwable cause) {
        super(message, cause);
    }
}

