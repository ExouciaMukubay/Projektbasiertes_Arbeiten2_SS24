package com.example.application.data.model.dto;

import com.example.application.data.keys.LikeKey;
import com.example.application.data.model.Like;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class LikeDto {

    private LikeKey key;
    public static LikeDto fromEntity(Like like){
        return new LikeDto(like.getKey());
    }
}
