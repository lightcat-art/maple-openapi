package com.nexon.maple.openapi.client.character.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
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
    private String characterDateCreate;
    private String access_flag;
    private String liberationQuestClearFlag;
}
