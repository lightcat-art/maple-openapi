package com.nexon.maple.openapi.client.character.response.skill;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CharacterSkill {
    private String skillName;
    private String skillDescription;
    private String skillLevel;
    private String skillEffect;
    private String skillIcon;
}