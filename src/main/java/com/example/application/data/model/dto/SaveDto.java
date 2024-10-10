package com.example.application.data.model.dto;

import com.example.application.data.keys.SaveKey;
import com.example.application.data.model.Save;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SaveDto {

    private SaveKey key;

    public static SaveDto fromEntity(Save save) {
        return new SaveDto(save.getKey());
    }
}