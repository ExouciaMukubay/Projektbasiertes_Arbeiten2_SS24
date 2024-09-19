package com.example.application.data.repository;

import com.example.application.data.model.ChatOverviewChats;
import com.example.application.data.keys.ChatOverviewChatsKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatOverviewChatsRepository extends JpaRepository<ChatOverviewChats, ChatOverviewChatsKey> {
}
