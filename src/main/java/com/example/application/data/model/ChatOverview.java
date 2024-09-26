package com.example.application.data.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "chatOverview")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatOverview {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToOne
    private User user;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<ChatOverviewChats> chatOverviewChats = new HashSet<>();

}

