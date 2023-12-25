package com.nexon.maple.openapi.client.character.response.hexamatrixstat;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CharacterHexaStatCore {
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
