package com.example.application.data.model;

import com.example.application.data.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "social_media_user")
@Getter
@Setter
@Builder()
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Length(min = 8, max = 20)
    @NotEmpty(message = "Username must not be empty")
    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "firstname")
    @NotEmpty(message = "First name must not be empty")
    private String firstname;

    @Column(name = "lastname")
    @NotEmpty(message = "Last name must not be empty")
    private String lastname;

    @Email
    @NotEmpty(message = "Email must not be empty")
    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    @NotEmpty(message = "Password must not be empty")
    @Size(min = 8, max = 64, message = "Passwort muss 8 bis 64 Zeichen lang sein.")
    @EqualsAndHashCode.Include
    private String password;

    @Column(name = "biography")
    private String biography;

    @Column(name = "isonline")
    private boolean isOnline;

    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    @NotNull
    private Set<Role> roles = new HashSet<>();

    /*
    @Column(name = "profilepictureurl")
    private String profilePictureUrl;

    @Column(name = "backgroundpictureurl")
    private String backgroundPictureUrl;
    */

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Like> likedPosts = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Save> savedPosts = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Post> createdPosts = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Comment> comments = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Friendship> friends = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Message> messages = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<UserChat> userChat = new HashSet<>();
}
