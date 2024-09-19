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

@Entity
@Table(name = "social_media_user")
@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class User extends AbstractEntity{

    @Length(min = 8, max = 20)
    @NotNull
    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "firstname")
    @NotNull
    private String firstname;

    @Column(name = "lastname")
    @NotNull
    private String lastname;

    @Email
    @NotEmpty
    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    @NotNull
    @Size(min = 8, max = 64, message = "Passwort muss 8 bis 64 Zeichen lang sein.")
    @EqualsAndHashCode.Include
    private String password;

    @Column(name = "biography")
    private String biography;

    @Column(name = "phonenumber")
    private String phoneNumber;

    @Column(name = "isonline")
    private boolean isOnline;

    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Role> roles = new HashSet<>();

//    @Column(name = "profilePictureUrl")
//    private String profilePictureUrl;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Likes> likes = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Post> posts = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Comment> comments = new HashSet<>();

    // sending friendships requests
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Friendship> friendshipsInitiated = new HashSet<>();

    // receiving all friendships requests
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Friendship> friendshipsReceived = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Message> messages = new HashSet<>();

    @OneToOne
    private ChatOverview chatOverview;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<UserChat> userChat = new HashSet<>();
}
