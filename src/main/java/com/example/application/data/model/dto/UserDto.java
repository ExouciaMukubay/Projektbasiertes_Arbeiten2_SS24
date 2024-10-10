package com.example.application.data.model.dto;

import com.example.application.data.model.User;
import lombok.*;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private UUID id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String biography;
    private String password;
    private Set<LikeDto> likedPosts;
    private boolean isOnline;

    public static UserDto fromEntity(User user){
        return new UserDto(user.getId(), user.getFirstname(), user.getLastname(),user.getUsername(), user.getEmail(),
                user.getBiography(), user.getPassword(),
                user.getLikedPosts().stream().map(LikeDto::fromEntity).collect(Collectors.toSet()), user.isOnline());
    }
}
