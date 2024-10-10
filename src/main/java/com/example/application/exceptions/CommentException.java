package com.example.application.exceptions;

import lombok.NoArgsConstructor;


@NoArgsConstructor
public class CommentException extends RuntimeException {
    public CommentException(String message) {
        super(message);
    }

    public CommentException(String message, Throwable cause) {
        super(message, cause);
    }
}
