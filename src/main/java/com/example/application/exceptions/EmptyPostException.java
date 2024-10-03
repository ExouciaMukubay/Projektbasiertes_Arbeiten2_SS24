package com.example.application.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class EmptyPostException extends RuntimeException{
    public EmptyPostException(String message) {
        super(message);
    }

    public EmptyPostException(String message, Throwable cause) {
        super(message, cause);
    }
}

