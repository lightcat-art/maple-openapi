package com.nexon.maple.api.character.response;

import com.fasterxml.jackson.annotation.JsonProperty;
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
        @JsonProperty("sub_stat_name_1")
        private String subStatName1;
        @JsonProperty("sub_stat_name_2")
        private String subStatName2;
        private int mainStatLevel;
        @JsonProperty("sub_stat_level_1")
        private int subStatLevel1;
        @JsonProperty("sub_stat_level_2")
        private int subStatLevel2;
        private int statGrade;
    }

    @Setter
    @Getter
    private static class PresetHexaStatCore {
        private String slotId;
        private String mainStatName;
        @JsonProperty("sub_stat_name_1")
        private String subStatName1;
        @JsonProperty("sub_stat_name_2")
        private String subStatName2;
        private int mainStatLevel;
        @JsonProperty("sub_stat_level_1")
        private int subStatLevel1;
        @JsonProperty("sub_stat_level_2")
        private int subStatLevel2;
        private int statGrade;
    }
}
