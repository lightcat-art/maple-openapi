package com.nexon.maple.openapi.client.character.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nexon.maple.openapi.client.character.response.vmatrix.CharacterVCoreEquipment;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class VMatrixResponse {
    private String date;
    private String characterClass;
    @JsonProperty("character_v_core_equipment")
    private List<CharacterVCoreEquipment> characterVCoreEquipment;
    @JsonProperty("character_v_matrix_remain_slot_upgrade_point")
    private int characterVMatrixRemainSlotUpgradePoint;

}
