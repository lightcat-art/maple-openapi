package com.nexon.maple.openapi.client.character.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class HexaMatrixResponse {
    private String date;
    private List<CharacterHexaCoreEquipment> characterHexaCoreEquipment;

    @Setter
    @Getter
    private static class CharacterHexaCoreEquipment {
        private String hexaCoreName;
        private int hexaCoreLevel;
        private String hexaCoreType;
        private List<LinkedSkill> linkedSkill;

        @Setter
        @Getter
        private static class LinkedSkill {
            private String hexaSkillId;
        }
    }
}
