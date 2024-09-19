package com.example.application.data.repository;

import com.example.application.data.model.ChatOverview;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ChatOverviewRepository extends CrudRepository<ChatOverview, UUID> {
}
