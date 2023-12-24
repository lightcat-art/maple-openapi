package com.nexon.maple.api.character.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BasicResponse {
    private String date;
    private String characterName;
    private String worldName;
    private String characterGender;
    private String characterClass;
    private String characterClassLevel;
    private String characterLevel;
    private String characterExp;
    private String characterExpRate;
    private String characterGuildName;
    private String characterImage;
}
