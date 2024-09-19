package com.example.application.data.enums;

public enum FriendshipStatus {

    PENDING,
    ACCEPTED,
    REJECTED;

    @Override
    public String toString() {
        return switch (this) {
            case PENDING -> "PENDING";
            case ACCEPTED -> "ACCEPTED";
            case REJECTED -> "REJECTED";
        };
    }
}
