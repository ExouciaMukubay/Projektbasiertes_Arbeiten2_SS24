package com.example.application.data.enums;

public enum Role {
    USER;

    @Override
    public String toString() {
        return switch (this) {
            case USER -> "USER";
        };
    }
}
