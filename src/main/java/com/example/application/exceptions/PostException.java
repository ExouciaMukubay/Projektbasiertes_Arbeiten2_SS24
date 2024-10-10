package com.example.application.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class PostException extends RuntimeException{
    public PostException(String message) {
        super(message);
    }

    public PostException(String message, Throwable cause) {
        super(message, cause);
    }
}

