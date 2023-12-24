package com.nexon.maple.api.character.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class HexaMatrixStatResponse {
    private String date;
    private String characterClass;
    private List<CharacterHexaStatCore> characterHexaStatCore;
    private List<PresetHexaStatCore> presetHexaStatCore;

    @Setter
    @Getter
    private static class CharacterHexaStatCore {
        private String slotId;
        private String mainStatName;
        private String subStatName1;
        private String subStatName2;
        private int mainStatLevel;
        private int subStatLevel1;
        private int subStatLevel2;
        private int statGrade;
    }

    @Setter
    @Getter
    private class PresetHexaStatCore {
        private String slotId;
        private String mainStatName;
        private String subStatName1;
        private String subStatName2;
        private int mainStatLevel;
        private int subStatLevel1;
        private int subStatLevel2;
        private int statGrade;
    }
}
