package com.nexon.maple.openapi.client.character.response.linkskill;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CharacterLinkSkill {
    private String skillName;
    private String skillDescription;
    private int skillLevel;
    private String skillEffect;
    private String skillIcon;
}
