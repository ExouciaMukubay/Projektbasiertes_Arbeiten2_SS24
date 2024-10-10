package com.example.application.data.repository;

import com.example.application.data.keys.SaveKey;
import com.example.application.data.model.Save;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SaveRepository  extends JpaRepository<Save, SaveKey> {

    Save findSaveByKey(SaveKey key);

    List<Save> findSaveByKeyPostId(UUID postId);
}
