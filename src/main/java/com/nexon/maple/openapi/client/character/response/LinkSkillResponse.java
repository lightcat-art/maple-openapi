package com.nexon.maple.openapi.client.character.response;

import lombok.Getter;
import lombok.Setter;
import java.util.List;


@Setter
@Getter
public class LinkSkillResponse {
    private String date;
    private String characterClass;
    private List<CharacterLinkSkill> characterLinkSkill;
    private CharacterOwnedLinkSkill characterOwnedLinkSkill;

    @Getter
    @Setter
    private static class CharacterLinkSkill {
        private String skillName;
        private String skillDescription;
        private int skillLevel;
        private String skillEffect;
        private String skillIcon;
    }

    @Getter
    @Setter
    private static class CharacterOwnedLinkSkill {
        private String skillName;
        private String skillDescription;
        private int skillLevel;
        private String skillEffect;
        private String skillIcon;
    }
}
