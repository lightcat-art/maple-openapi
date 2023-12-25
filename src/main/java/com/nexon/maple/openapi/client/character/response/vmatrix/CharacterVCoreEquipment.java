package com.nexon.maple.openapi.client.character.response.vmatrix;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CharacterVCoreEquipment {
    private String slotId;
    private int slotLevel;
    @JsonProperty("v_core_name")
    private String vCoreName;
    @JsonProperty("v_core_type")
    private String vCoreType;
    @JsonProperty("v_core_level")
    private int vCoreLevel;
    @JsonProperty("v_core_skill_1")
    private String vCoreSkill1;
    @JsonProperty("v_core_skill_2")
    private String vCoreSkill2;
    @JsonProperty("v_core_skill_3")
    private String vCoreSkill3;
}
