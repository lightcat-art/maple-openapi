package com.nexon.maple.api.character.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
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
