package com.example.application.data.model.dto;

import com.example.application.data.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
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



    public static UserDto fromEntity(User user){
        return new UserDto(user.getId(), user.getFirstname(), user.getLastname(),user.getUsername(), user.getEmail(),
                user.getBiography(), user.getPassword());
    }
}
