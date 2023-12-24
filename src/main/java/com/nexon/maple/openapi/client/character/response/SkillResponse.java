package com.nexon.maple.openapi.client.character.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class SkillResponse {
    private String date;
    private String characterClass;
    private String characterSkillGrade;
    private List<CharacterSkill> characterSkill;

    @Getter
    @Setter
    private static class CharacterSkill {
        private String skillName;
        private String skillDescription;
        private String skillLevel;
        private String skillEffect;
        private String skillIcon;
    }
}
