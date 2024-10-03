package com.example.application.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class FriendshipDoesNotExist extends RuntimeException{
    public FriendshipDoesNotExist(String message) {
        super(message);
    }

    public FriendshipDoesNotExist(String message, Throwable cause) {
        super(message, cause);
    }
}

